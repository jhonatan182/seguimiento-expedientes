import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import NextAuth, { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { getUserByUsername } from "./actions/auth-actions";
import { buildMenuByJefe } from "@/utils";

export class InactiveUserError extends AuthError {
  static type = "InactiveUser";
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.username = user.username;
        token.modulo = user.modulo;
        token.isJefe = user.isJefe;
        token.menuOptions = user.menuOptions;
        token.oficina = user.oficina;
      }
      return token;
    },

    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.modulo = token.modulo;
        session.user.isJefe = token.isJefe;
        session.user.menuOptions = token.menuOptions;
        session.user.oficina = token.oficina;
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

        if (user.isActivo === "N") {
          throw new InactiveUserError("Inactive user");
        }

        //Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(
          credentials.password as string,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        const menu = buildMenuByJefe(user.isJefe);

        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.usuario,
          username: user.usuario,
          modulo: user.modulo,
          isJefe: user.isJefe,
          menuOptions: menu,
          oficina: user.oficina,
        };
      },
    }),
  ],
};
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
});
