import { Barbecue, Guest, User } from '@prisma/client';

type FetcherBody =
  | User
  | Barbecue
  | Omit<
      Barbecue,
      'totalValue' | 'createdAt' | 'updatedAt' | 'deleted' | 'ownerId'
    >
  | Pick<Guest, 'name' | 'valueToPay'>
  | { totalValue?: number; id: string };

const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: 'POST' | 'GET' | 'DELETE';
  body: FetcherBody;
  json: boolean;
}) => {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: User) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const signin = async (user: User) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  });
};

export const createNewBarbecue = (
  barbecue: Omit<
    Barbecue,
    'totalValue' | 'createdAt' | 'updatedAt' | 'deleted' | 'ownerId'
  >
) => {
  return fetcher({
    url: '/api/barbecue',
    method: 'POST',
    body: barbecue,
    json: true,
  });
};

export const createNewGuest = (
  guest: Pick<Guest, 'name' | 'valueToPay' | 'barbecueId'>
) => {
  return fetcher({
    url: '/api/guest',
    method: 'POST',
    body: guest,
    json: true,
  });
};

export const deleteGuest = (id: string) => {
  return fetcher({
    url: '/api/guest',
    method: 'DELETE',
    body: { id },
    json: true,
  });
};
