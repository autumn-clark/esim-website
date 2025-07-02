import { supabase } from "../../../supabaseClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_email", session.user.email)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
