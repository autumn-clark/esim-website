// pages/api/esim/user-esims.ts
import { supabase } from "../../../supabaseClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if(!session.user?.email){
        return res.status(401).json({ error: "No mail" });

  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("order_no")
    .eq("user_email", session.user.email);

  if (error || !orders) {
    return res.status(500).json({ error: error?.message || "Failed to fetch orders" });
  }

  const results = [];

  for (const order of orders) {
    const response = await fetch("https://api.esimaccess.com/api/v1/open/esim/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RT-AccessCode": process.env.ESIM_API_KEY ?? "",
        "RT-SecretCode": process.env.ESIM_SECRET_KEY ?? "",
      },
      body: JSON.stringify({
        orderNo: order.order_no,
        pager: { pageSize: 50, pageNum: 1 },
      }),
    });

    const data = await response.json();

    if (data.success && data.obj?.esimList) {
      results.push(...data.obj.esimList);
    }
  }

  res.status(200).json(results);
}
