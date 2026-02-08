"use server";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";
import { auth, signIn } from "@/app/auth.config";
import { getCookie } from "./cookies-actions";
import { LoginSchemaType } from "@/schemas";
import { db } from "@/lib/drizzle";

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

export async function getSessionUserWithCookies() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const semanaIdCookie = await getCookie("semanaId");

  if (!semanaIdCookie) {
    throw new Error("No se encontró la semana");
  }

  return {
    user: session.user,
    cookies: {
      semanaId: Number(semanaIdCookie),
    },
  };
}
