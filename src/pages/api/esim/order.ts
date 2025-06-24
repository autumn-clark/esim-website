import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const response = await fetch('https://api.esimaccess.com/order', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.ESIMACCESS_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  }
  