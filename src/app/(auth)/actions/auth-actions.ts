"use server";

import { signIn } from "@/app/auth.config";
import { AuthError } from "next-auth";
import { LoginSchemaType } from "@/schemas";

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
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
