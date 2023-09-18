import BarbecueList from '@/components/barbecueList';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

const getBarbecues = async () => {
  const user = await getUserFromCookie(cookies());
  const barbecues = await db.barbecue.findMany({
    where: {
      ownerId: user?.id,
    },
    take: 10,
    orderBy: {
      date: 'asc',
    },
    include: {
      guests: true,
    },
  });

  return { barbecues };
};

const BarbecuesPage = async () => {
  const { barbecues } = await getBarbecues();

  return (
    <main className="flex min-h-screen flex-col items-center pt-[54px] pb-44 bg-tertiary">
      <BarbecueList barbecues={barbecues} />
    </main>
  );
};

export default BarbecuesPage;
