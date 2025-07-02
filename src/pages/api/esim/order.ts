import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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

    res.status(200).json({ success: true, order: orderData.obj });

  } else if (req.method === 'GET') {
    const userEmail = req.query.userEmail as string;

    if (!userEmail) {
      return res.status(400).json({ error: 'Missing userEmail in query' });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    return res.status(200).json({ success: true, orders: data });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
