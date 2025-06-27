import type { NextApiRequest, NextApiResponse } from "next";

// pages/api/esim/plans.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locationCode = "" } = req.query;
  const response = await fetch("https://api.esimaccess.com/api/v1/open/package/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "RT-AccessCode": process.env.ESIM_API_KEY ?? "",   // Set in .env.local
      "RT-SecretCode": process.env.ESIM_SECRET_KEY ?? ""    // Set in .env.local
    },
    body: JSON.stringify({
      locationCode,
      type: "",
      slug: "",
      packageCode: "",
      iccid: ""
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
