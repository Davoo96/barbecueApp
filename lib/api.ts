import { Barbecue, User } from '@prisma/client';

const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: 'POST' | 'GET';
  body:
    | User
    | Barbecue
    | Omit<
        Barbecue,
        'totalValue' | 'createdAt' | 'updatedAt' | 'deleted' | 'ownerId'
      >;
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
