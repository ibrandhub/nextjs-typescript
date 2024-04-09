'use client';

import { SessionProvider } from 'next-auth/react';

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
