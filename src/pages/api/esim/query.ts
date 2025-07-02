// src/pages/api/esim/query.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderNo, iccid, pageNum = 1, pageSize = 50 } = req.body;

  const response = await fetch("https://api.esimaccess.com/api/v1/open/esim/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "RT-AccessCode": process.env.ESIM_API_KEY ?? '',
      "RT-SecretCode": process.env.ESIM_SECRET_KEY ?? '',
    },
    body: JSON.stringify({
      orderNo,
      iccid,
      pager: {
        pageNum,
        pageSize,
      },
    }),
  });

  const data = await response.json();

  if (!data.success) {
    return res.status(400).json({ error: data.errorMessage || "Failed to query profiles" });
  }

  res.status(200).json(data.obj);
}
