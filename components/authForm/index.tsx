'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { register, signin } from '@/lib/api';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useCallback, useState } from 'react';

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Já tem uma conta?',
  buttonText: 'Cadastre-se',
};

const signinContent = {
  linkUrl: '/register',
  linkText: 'Crie sua conta',
  buttonText: 'Entre',
};

const initial: User = {
  id: '',
  email: '',
  password: '',
};

const AuthForm = ({ mode }: { mode: 'signin' | 'register' }) => {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace('/barbecues');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [mode, router, formState]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <form className="z-20 w-full" onSubmit={handleSubmit}>
      <div className="bg-gradient-to-t from-primary to-secondary w-full mb-9">
        <label
          htmlFor="login"
          className="font-bold block mb-4 text-xl max-w-[282px] mx-auto"
        >
          Login
        </label>
        <Input type="text" placeholder="e-mail" />
      </div>
      <label
        htmlFor="login"
        className="font-bold block mb-4 text-xl max-w-[282px] mx-auto"
      >
        Senha
      </label>
      <Input required type="password" placeholder="senha" />

      <div></div>

      <div className="flex items-center justify-between mt-[74px] max-w-[600px] mx-auto">
        <Link
          className="bg-white rounded-[18px] text-black text-center py-[14px] max-w-[282px] w-full shadow-xs"
          href={content.linkUrl}
        >
          {content.linkText}
        </Link>
        <Button type="submit" title={content.buttonText} />
      </div>
    </form>
  );
};

export default AuthForm;
