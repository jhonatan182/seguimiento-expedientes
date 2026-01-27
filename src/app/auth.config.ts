import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials: credentials.username });

        return {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          image: "https://example.com/john-doe.jpg",
        };
      },
    }),
  ],
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
