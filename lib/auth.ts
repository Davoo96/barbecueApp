import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const hashPassword = (password: string | Buffer) =>
  bcrypt.hash(password, 10);

export const comparePasswords = (
  plainTextPassword: string | Buffer,
  hashedPassword: string
) => bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user: User) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

export const getUserFromCookie = async (cookies: ReadonlyRequestCookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME as string);

  if (!jwt) return null;

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
