import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../../../../lib/mongodb';
import { User } from '../../../../models/user';

const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();

          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            return null;
          }
          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    // maxAge: Number(process.env.JWT_TIMEOUT!),
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
};

export default NextAuth(authOption);

// const authHandler = NextAuth(authOption);
// export { authHandler as GET, authHandler as POST };
