'use client';

import NewGuest from '@/components/newGuest';
import { deleteGuest } from '@/lib/api';
import { BarbecueWithGuests } from '@/utils/types';
import Image from 'next/image';
import trashCan from '../../public/trash.svg';

const BarbecueDashboard = ({ barbecue }: { barbecue: BarbecueWithGuests }) => {
  const handleOnClick = (id: string) => {
    deleteGuest(id).then(() => location.reload());
  };

  return (
    <ul className="mt-11">
      {barbecue.guests.map((guest) => (
        <li
          key={guest.id}
          className="flex justify-between border-b-quintenary border-b-[1px] text-xl font-bold pb-2 mb-2"
        >
          <p className="text-opacity-8">{guest.name}</p>
          <div className="flex items-center justify-center gap-2">
            <span>R$ {guest.valueToPay}</span>
            <button onClick={() => handleOnClick(guest.id)}>
              <Image
                src={trashCan}
                alt="icone de uma lixeira"
                width={25}
                height={25}
              />
            </button>
          </div>
        </li>
      ))}
      <li>
        <NewGuest barbecue={barbecue} />
      </li>
    </ul>
  );
};

export default BarbecueDashboard;
