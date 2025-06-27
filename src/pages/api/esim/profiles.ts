// src/pages/api/esim/profiles.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://api.esimaccess.com/api/v1/open/esim/profile/allocate/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "RT-AccessCode": process.env.ESIM_API_KEY ?? "",
        "RT-SecretCode": process.env.ESIM_SECRET_KEY ?? "",
      },
      body: JSON.stringify({
        // Optional filters: packageCode, iccid, orderNo
        // You can pass these from frontend if needed
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ error: data.errorMsg || "Failed to fetch profiles." });
    }

    return res.status(200).json(data.obj?.esimProfileList || []);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
