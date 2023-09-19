import BarbecueCard from '@/components/barbecueCard';
import NewBarbecue from '@/components/newBarbecue';
import { BarbecueWithGuests } from '@/utils/types';
import Link from 'next/link';

const BarbecueList = ({ barbecues }: { barbecues: BarbecueWithGuests[] }) => {
  return (
    <>
      {barbecues && barbecues.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 z-30">
          {barbecues.map((barbecue) => (
            <li key={barbecue.id} className="shadow-xs">
              <Link href={`/barbecues/${barbecue.id}`}>
                <BarbecueCard barbecue={barbecue} />
              </Link>
            </li>
          ))}
          <li>
            <NewBarbecue />
          </li>
        </ul>
      ) : (
        <div className="z-30">
          <NewBarbecue />
        </div>
      )}
    </>
  );
};

export default BarbecueList;
