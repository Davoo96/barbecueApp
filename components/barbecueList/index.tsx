import BarbecueCard from '@/components/barbecueCard';
import NewChurras from '@/components/newChurras';
import { BarbecueWithGuests } from '@/utils/types';
import Link from 'next/link';

const BarbecueList = ({ barbecues }: { barbecues: BarbecueWithGuests[] }) => {
  return (
    <>
      {barbecues && barbecues.length ? (
        <ul className="grid grid-cols-2 gap-6 z-30">
          {barbecues.map((barbecue) => (
            <li key={barbecue.id}>
              <Link href={`/barbecues/${barbecue.id}`}>
                <BarbecueCard barbecue={barbecue} />
              </Link>
            </li>
          ))}
          <li>
            <NewChurras />
          </li>
        </ul>
      ) : (
        <div className="z-30">
          <NewChurras />
        </div>
      )}
    </>
  );
};

export default BarbecueList;
