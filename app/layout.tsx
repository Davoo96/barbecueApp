import './globals.css';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Churras Trinca',
  description:
    'Aplicativo para gerenciar as datas e horários dos churrascos da Trinca',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} relative`}>
        <div className="relative flex items-center justify-center">
          <div className="bg-primary absolute inset-0 w-full h-[300px] z-10">
            <Image
              src="/bbq_pattern.svg"
              width={636}
              height={300}
              className="w-full h-full object-cover"
              alt="Barbecue pattern"
              priority
            />
          </div>
          <Link href="/barbecues" className="z-20">
            <h1 className="pt-[70px] mb-12 font-extrabold text-3xl text-black">
              Agenda de Churras
            </h1>
          </Link>
        </div>
        {children}
        <Image
          src="trinca.svg"
          width={48}
          height={48}
          alt="Trinca logo"
          className="absolute bottom-7 left-1/2 -translate-x-1/2"
        />
        <div id="modal"></div>
      </body>
    </html>
  );
}
