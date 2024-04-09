"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <Navbar />
        Signin is as {session?.user?.email}{" "}
        <button onClick={() => signOut}> Sign out</button>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div>Not login</div>
      <button onClick={() => signIn()}>Signin</button>
      <div className="container mx-auto p-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
        consequuntur alias quam ab eos molestiae placeat porro maiores, hic quae
        velit enim, voluptates ex magni dignissimos obcaecati ipsa pariatur.
        Error.
      </div>
    </>
  );
}
