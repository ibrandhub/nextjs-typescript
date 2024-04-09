'use client';

import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';

function Navbar() {
  return (
    <>
      <nav className="bg-[#333] p-4 text-white flex justify-between items-center">
        <h1 className="font-bold text-3xl ">
          <Link href="/">Nextjs + Typescript</Link>
        </h1>
        <ul className="flex">
          <li className="bg-blue-300 p-2 mx-2 rounded-md">
            <Link href="/login">Login</Link>
          </li>
          <li className="bg-red-400 p-2 mx-2 rounded-md">
            <a onClick={() => signOut()}>Logout</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
