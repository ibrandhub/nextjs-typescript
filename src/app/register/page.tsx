'use client';

import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Register() {
  const [error, setError] = React.useState<string | null>(null);

  const { data: session } = useSession();

  if (session) {
    redirect('/welcome');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match !');
      return;
    }

    if (!data.name || !data.email || !data.password) {
      setError('Please fill all fields !');
      return;
    }

    try {
      const responseCheck = await fetch('/api/checkUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const { user } = await responseCheck.json();

      if (user) {
        setError('User already exists !');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const form = e.target;
        setError('');
        (form as HTMLFormElement).reset();
      }
    } catch (error) {
      setError('An error occurred while registering user');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-sm mx-auto py-10">
        <h1 className="text-2xl font-semibold">Register Page</h1>
        <hr className="my-3" />
        <div className="max-w-screen-sm mx-auto">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Enter your name"
            />
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Enter your email address"
            />
            <label htmlFor="password" className="block mt-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Enter your password"
            />
            <label htmlFor="confirmPassword" className="block mt-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="border border-gray-300 p-2 rounded-md w-full"
              placeholder="Confirm your password"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-2 rounded-md w-full"
            >
              Register
            </button>
          </form>

          <div className="text-center my-3">
            Go to{' '}
            <Link href={'/login'} className="text-blue-500">
              Login
            </Link>
          </div>

          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
