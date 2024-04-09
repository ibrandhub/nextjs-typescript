'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/welcome');
    }
  }, [session, router]);

  return (
    <>
      <Navbar />

      <div className="max-w-screen-sm mx-auto py-10">
        <h1 className="text-2xl font-semibold">
          Nextjs + Typescript + NextAuth
        </h1>
        <hr className="my-3" />
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
          consequuntur alias quam ab eos molestiae placeat porro maiores, hic
          quae velit enim, voluptates ex magni dignissimos obcaecati ipsa
          pariatur. Error.
        </div>
      </div>
    </>
  );
}
