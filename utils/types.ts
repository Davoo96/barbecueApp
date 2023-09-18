import { Barbecue, Guest } from '@prisma/client';

export interface BarbecueWithGuests extends Barbecue {
  guests: Guest[];
}
