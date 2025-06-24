import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.ESIM_API_KEY;
  const secretKey = process.env.ESIM_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return res.status(500).json({ error: 'API key or Secret key is missing' });
  }

  try {
    const response = await fetch('https://api.esimaccess.com/api/v1/open/package/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
        'secretkey': secretKey,
      },
      body: JSON.stringify({
        locationCode: '',
        type: '',
        slug: '',
        packageCode: '',
        iccid: '',
      }),
    });

    const data = await response.json();

    console.log('ESIM API response:', data);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching ESIM API:', error);
    return res.status(500).json({ error: 'Failed to fetch ESIM API' });
  }
}
