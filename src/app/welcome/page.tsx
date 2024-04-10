'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';
import { IUser } from '../../../models/user';
import Link from 'next/link';

export default function Welcome() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    const fetchUsers = async () => {
      const user: any = session?.user;
      if (user) {
        const res = await fetch(`/api/user/${user?.sub}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();

        if (data.users) {
          setProfile(data.users);
        }
      }
    };
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.users) {
        setUsers(data.users);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: string | undefined) => async () => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const newUsers = users.filter((user) => user._id !== id);
        setUsers(newUsers);
      }
    } catch (error) {
      console.error('An error occurred while deleting user');
    }
  };

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
          <h3 className="text-3xl font-bold">
            Hello... {session?.user?.email}
            <span className="text-blue-500">
              {profile?.role === 'admin' ? ' (Admin)' : ''}
            </span>
          </h3>
          <hr className="my-3" />

          {users && users.length > 0 ? (
            <ul>
              {users.map((user, k) => (
                <li key={user.email}>
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <h3 className="mr-2 font-bold">{`${k + 1}.`}</h3>

                      <div>
                        <p className="font-bold">{`Email: ${user.email}`}</p>
                        <p>{`Name: ${user.name}`}</p>
                        <p>{`Role: ${user.role}`}</p>
                      </div>
                    </div>
                    {profile?.role === 'admin' && (
                      <div className="flex">
                        <Link className="mx-1" href={`/profile/${user?._id}`}>
                          edit
                        </Link>
                        <button
                          className="mx-1"
                          onClick={handleDelete(user?._id)}
                        >
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                  <hr className="my-3" />
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </>
    );
  }
}
