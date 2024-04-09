'use client';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';

export default function Welcome() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Navbar />
        <div className="max-w-screen-sm mx-auto py-10">
          <h1 className="text-3xl font-bold">Welcome Page</h1>
          <hr className="my-3" />
          <p>Please login to access the welcome page</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Navbar session={session} />
        <div className="max-w-screen-sm mx-auto py-10">
          <h3 className="text-3xl font-bold"> Hello {session?.user?.email} </h3>
        </div>
      </>
    );
  }
}
