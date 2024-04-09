import NextAuth, { AuthOptions, SessionOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "../../../../lib/mongodb";
import { User } from "../../../../models/user";

const hanlder = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials): Promise<any> {
        try {
          // Add your authentication logic here
          if (
            credentials &&
            credentials.email === "x@x" &&
            credentials.password === "a"
          ) {
            // Return user object if credentials are valid
            return { id: 1, email: "test@example.com" };
          } else {
            // Return null if credentials are invalid
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
});

export { hanlder as GET, hanlder as POST };
