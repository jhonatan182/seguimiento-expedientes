"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/drizzle";

import { PamSemanaType } from "@/db/schema";
import { auth } from "../auth.config";

export async function getSemanas(): Promise<PamSemanaType[]> {
  const usuario = await auth();

  if (!usuario?.user) {
    redirect("/login");
  }

  const semanas = await db.query.PamSemanas.findMany();

  //   console.log(JSON.stringify(semanas, null, 2));

  return semanas || [];
}
