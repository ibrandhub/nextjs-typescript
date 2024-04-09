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
          // Add your authentication logic here

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

          return { email: user.email };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
});

export { hanlder as GET, hanlder as POST };
