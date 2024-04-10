'use client';

import Navbar from '@/components/layout/Navbar';
import { useSession } from 'next-auth/react';
import React, { use, useEffect, useState } from 'react';
import { IUser } from '../../../../models/user';

function ProfilePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<IUser>();
  const [role, setRole] = useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/user/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      if (data) {
        setProfile(data.users);
      }
    };
    if (params.id) {
      fetchUsers();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      role: formData.get('role'),
    };

    try {
      const response = await fetch(`/api/user/${profile?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setError('');
        setSuccess('User updated successfully');
      }
    } catch (error) {
      setError('An error occurred while registering user');
    }
  };

  const optionsRole: { value: string; label: string }[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ];

  return (
    <>
      <Navbar session={session} />
      <div className="max-w-screen-sm mx-auto py-10">
        <h1 className="text-2xl font-semibold">Profile Page</h1>
        <hr className="my-3" />
        <label htmlFor="name" className="block">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Enter your name"
          defaultValue={profile?.email || ''}
          readOnly
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter your name"
            defaultValue={profile?.name || ''}
            required
          />

          <label htmlFor="name" className="block">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={role || profile?.role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {optionsRole.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-2 rounded-md w-full"
          >
            Update data
          </button>
        </form>

        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2 mx-auto">
            {success}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
