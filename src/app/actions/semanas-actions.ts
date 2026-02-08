"use server";

import { redirect } from "next/navigation";

import { PamSemanaType } from "@/db/schema";
import { auth } from "../auth.config";
import { db } from "@/lib/drizzle";

export async function getSemanas(): Promise<PamSemanaType[]> {
  const usuario = await auth();

  if (!usuario?.user) {
    redirect("/login");
  }

  const semanas = await db.query.PamSemanas.findMany();

  return semanas || [];
}

export async function getSemanasByDescripcion(
  descripcion: string,
): Promise<PamSemanaType | undefined> {
  const usuario = await auth();

  if (!usuario?.user) {
    redirect("/login");
  }

  const semana = await db.query.PamSemanas.findFirst({
    where: (semanas, { eq }) => eq(semanas.descripcion, descripcion),
  });

  return semana;
}
