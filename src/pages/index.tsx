import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start gap-10 p-24 ${inter.className}`}
    >
      <Link
        className={
          'text-3xl rounded-md border-black border-2 p-4 hover:bg-gray-200'
        }
        href={'/mdx-bundler'}
      >
        MDX Bundler
      </Link>
      <Link
        className={
          'text-3xl rounded-md border-black border-2 p-4 hover:bg-gray-200'
        }
        href={'/contentlayer'}
      >
        Content Layer
      </Link>
      <Link
        className={
          'text-3xl rounded-md border-black border-2 p-4 hover:bg-gray-200'
        }
        href={'/next-mdx-remote'}
      >
        Next MDX Remote
      </Link>
    </main>
  );
}
