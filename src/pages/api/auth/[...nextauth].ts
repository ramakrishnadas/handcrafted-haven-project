import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { nullable, z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthConfig } from "next-auth";


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        const user = await getUser(session.user.email);
        if (user) {
          session.user.id = user.id;
          session.user.name = token.name; // Access the name property through the user object
        }
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

const handler = NextAuth(authOptions);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  await NextAuth(authOptions);
}

export {handler as GET, handler as POST};
