import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transactionId, packageCode, price, userEmail } = req.body;

  if (!transactionId || !packageCode || !price || !userEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Call esimaccess order API
  const orderResponse = await fetch('https://api.esimaccess.com/api/v1/open/esim/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'RT-AccessCode': process.env.ESIM_API_KEY ?? '',
      'RT-SecretCode': process.env.ESIM_SECRET_KEY ?? '',
    },
    body: JSON.stringify({
      transactionId,
      amount: price,
      packageInfoList: [{ packageCode, count: 1, price }],
    }),
  });

  const orderData = await orderResponse.json();

  if (!orderData.success) {
    return res.status(400).json({ error: orderData.errorMsg || 'Order failed' });
  }

  // Save order to Supabase
  const { error } = await supabase.from('orders').insert([
    {
      user_email: userEmail,
      transaction_id: transactionId,
      package_code: packageCode,
      price: price,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: 'Failed to save order in database' });
  }

  // Return the API order response plus your own success message
  res.status(200).json({ success: true, order: orderData.obj });
}
