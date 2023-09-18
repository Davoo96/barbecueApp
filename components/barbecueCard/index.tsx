import { BarbecueWithGuests } from '@/utils/types';
import Image from 'next/image';

const BarbecueCard = ({ barbecue }: { barbecue: BarbecueWithGuests }) => {
  return (
    <div className="p-6 rounded-sm bg-white w-[282px] hover:scale-105 transition-all ease-in-out duration-200">
      <span className="mb-2 text-[28px] font-extrabold">{barbecue.date}</span>
      <h3 className="text-xl font-bold mb-12">{barbecue.name}</h3>
      <div className="flex items-center justify-between">
        <p className="text-xl">
          <span>
            <Image
              src="/icon_people.svg"
              width={20}
              height={20}
              alt="Trinca logo"
              className="inline-block mr-3"
            />
          </span>
          {barbecue.guests.length === 0 ? '-' : barbecue.guests.length}
        </p>
        <p className="text-xl">
          <span>
            <Image
              src="/icon_money.svg"
              width={20}
              height={20}
              alt="Trinca logo"
              className="inline-block mr-3"
            />
          </span>
          R${barbecue.totalValue ?? '-'}
        </p>
      </div>
    </div>
  );
};

export default BarbecueCard;
