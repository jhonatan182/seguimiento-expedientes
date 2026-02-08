import { type IMenuItem } from "@/interfaces";
import NextAuth, { type DefaultSession } from "next-auth";

interface IUser {
  id: string;
  username: string;
  modulo: string;
  isJefe: string;
  menuOptions: IMenuItem[];
  oficina: string;
}

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: IUser & DefaultSession["user"];
  }

  interface User extends IUser {}
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends IUser {}
}
