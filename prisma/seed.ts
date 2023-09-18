import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

async function main() {
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      password: await hashPassword('password'),
      barbecues: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          date: '12/12',
          description: `Everything that describes Project ${i}`,
          valueWithAlcohol: 20,
          valueWithoutAlcohol: 10,
        })),
      },
    },
    include: {
      barbecues: true,
    },
  });

  const barbecues = await Promise.all(
    user.barbecues.map((barbecue, index) =>
      db.barbecue.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Barbecue ${index}-${i}`,
            ownerId: user.id,
            description: `Everything that describes Task ${i}`,
            date: '12/12',
            valueWithAlcohol: 20,
            valueWithoutAlcohol: 10,
          };
        }),
      })
    )
  );

  console.log({ user, barbecues });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
