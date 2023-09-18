import BarbecueDashboard from '@/components/barbecueDashboard';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

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

  console.log(params.id, barbecue);

  return (
    <main className="flex min-h-screen flex-col items-center pt-[54px] pb-44 bg-tertiary">
      <div className="bg-white w-full-p-12 mx-auto z-30">
        <p>{barbecue[0].name}</p>
        <BarbecueDashboard />
      </div>
    </main>
  );
};

export default BarbecuePage;
