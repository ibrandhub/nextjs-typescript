'use client';

import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';

interface INav {
  session?: any;
}

function Navbar({ session }: INav) {
  return (
    <>
      <nav className="bg-[#333] p-4 text-white flex justify-between items-center">
        <h1 className="font-bold text-3xl ">
          <Link href={session ? '/welcome' : '/'}>NextAuth</Link>
        </h1>
        <ul className="flex">
          {!session ? (
            <>
              <li className="bg-blue-300 p-2 mx-2 rounded-md">
                <Link href="/register">Register</Link>
              </li>
              <li className="bg-blue-500 p-2 mx-2 rounded-md">
                <Link href="/login">Login</Link>
              </li>
            </>
          ) : (
            <li className="bg-red-400 p-2 mx-2 rounded-md">
              <a className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
