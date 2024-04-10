import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../../../../../lib/mongodb';
import { User } from '../../../../../models/user';

const hanlder = NextAuth({
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
      async authorize(credentials): Promise<any> {
        try {
          await connectMongoDB();

          const user = await User.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error('No user found');
          }

          if (credentials?.password) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isValid) {
              throw new Error('Invalid password');
            }
          }

          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return token;
    },

    session: async ({ session, token, user }) => {
      session.user = token;
      return session;
    },
  },
});

export { hanlder as GET, hanlder as POST };
