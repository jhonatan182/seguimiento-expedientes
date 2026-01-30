"use server";

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 años
  });
}

export async function getCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}
