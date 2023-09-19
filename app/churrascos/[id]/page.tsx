import BarbecueDashboard from '@/components/barbecueDashboard';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import Image from 'next/image';

const getBarbecue = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const barbecue = await db.barbecue.findMany({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      guests: true,
    },
  });

  return barbecue;
};

const BarbecuePage = async ({ params }: { params: { id: string } }) => {
  const barbecue = await getBarbecue(params.id);

  const valueToPay = barbecue[0].guests.reduce((acc, curr) => {
    const totalValue = acc + curr.valueToPay;
    return totalValue;
  }, 0);

  await db.barbecue.update({
    where: { id: params.id },
    data: { totalValue: valueToPay },
  });

  return (
    <main className="flex min-h-screen flex-col items-center pt-[54px] bg-tertiary">
      <div className="bg-white w-full-p-12 mx-auto p-6 z-30">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-extrabold text-[28px]">{barbecue[0].date}</p>
            <p className="text-4xl font-bold text-opacity-8">
              {barbecue[0].name}
            </p>
            <p className="pt-4">{barbecue[0].description}</p>
          </div>
          <div>
            <p>
              <span>
                <Image
                  src="/icon_people.svg"
                  width={20}
                  height={20}
                  alt="Trinca logo"
                  className="inline-block mr-3"
                />
              </span>
              {barbecue[0].guests.length ?? 0}
            </p>
            <p>
              <span>
                <Image
                  src="/icon_money.svg"
                  width={20}
                  height={20}
                  alt="Trinca logo"
                  className="inline-block mr-3"
                />
              </span>
              R$ {valueToPay}
            </p>
          </div>
        </div>
        <BarbecueDashboard barbecue={barbecue[0]} />
      </div>
    </main>
  );
};

export default BarbecuePage;
