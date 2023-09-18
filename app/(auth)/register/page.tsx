import AuthForm from '@/components/authForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-[54px] bg-primary">
      <AuthForm mode="register" />
    </main>
  );
}
