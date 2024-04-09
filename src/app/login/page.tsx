"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";

function Login() {
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  // const { data: session } = useSession();
  // console.log(session);
  // if (session) {
  //   console.log('return')
  //   return (
  //     <>
  //       Signin is as {session?.user?.email}{" "}
  //       <button onClick={() => signOut}> Sign out</button>
  //     </>
  //   );
  // }

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handlerSubmit", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      redirect: false,
    });
    try {
      const response: any = await signIn("credentials", {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        redirect: false,
      });

      console.log("response login", response);
      if (response.error) {
        setError(response.error);
      } else {
        response.url = "/";
        router.push(response.url); // Redirect to the URL returned by NextAuth.js
      }
    } catch (error) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-sm mx-auto py-10">
        <h1 className="text-2xl font-semibold">Login Page</h1>
        <hr className="my-3" />
        <div className="max-w-screen-sm mx-auto">
          <form onSubmit={handlerSubmit}>
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
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-2 rounded-md w-full"
            >
              Login
            </button>
          </form>

          <div className="text-center my-3">
            Go to{" "}
            <Link href={"/register"} className="text-blue-500">
              Register
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

export default Login;
