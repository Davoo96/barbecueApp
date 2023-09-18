import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    await db.guest.delete({ where: { id } });
    res.json({ data: { message: 'Guest deleted successfully' } });
  } else {
    await db.guest.create({
      data: {
        name: req.body.name,
        valueToPay: req.body.valueToPay,
        barbecueId: req.body.barbecueId,
      },
    });

    res.json({ data: { message: 'ok' } });
  }
}
