"use server";

import { signIn } from "@/app/auth.config";
import { AuthError } from "next-auth";
import { LoginSchemaType } from "@/schemas";
import { db } from "@/lib/drizzle";
import { PamAnalista } from "@/db/schema/PAM_ANALISTA";
import { eq } from "drizzle-orm";

export async function authenticate(data: LoginSchemaType) {
  try {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    return "User signed in successfully";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas.";
        default:
          return "Algo salió mal.";
      }
    }
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  const user = await db
    .select()
    .from(PamAnalista)
    .where(eq(PamAnalista.usuario, username))
    .limit(1)
    .get();

  return user;
}
