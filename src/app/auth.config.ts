import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { getUserByUsername } from "./actions/auth-actions";
import bcrypt from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.username = user.username;
        token.modulo = user.modulo;
        token.isJefe = user.isJefe;
      }
      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.modulo = token.modulo;
        session.user.isJefe = token.isJefe;
      }

      return session;
    },
  },

  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        //Buscar el usuario en la base de datos
        const user = await getUserByUsername(credentials.username as string);

        if (!user) {
          return null;
        }

        //Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.usuario,
          username: user.usuario,
          modulo: user.modulo,
          isJefe: user.isJefe,
        };
      },
    }),
  ],
};
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
});
