import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieName = process.env.COOKIE_NAME;
  if (!cookieName) {
    return res.status(500).json({
      error: 'COOKIE_NAME not found please provide one on the .env file',
    });
  }
  const user = await validateJWT(req.cookies[cookieName] as string);

  await db.barbecue.create({
    data: {
      name: req.body.name,
      valueWithAlcohol: req.body.valueWithAlcohol,
      valueWithoutAlcohol: req.body.valueWithoutAlcohol,
      date: req.body.date,
      description: req.body.description,
      guests: req.body.guests,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: 'ok' } });
}
