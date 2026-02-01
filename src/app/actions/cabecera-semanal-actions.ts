"use server";

import { and, eq } from "drizzle-orm";

import { PamCabeceraSemanal } from "@/db/schema";
import { db } from "@/lib/drizzle";

export async function getCabeceraSemanal(userId: number, semanaId: number) {
  //verficar si existe cabecera en la semana que se esta creando el expediente
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.analistaId, userId),
      eq(PamCabeceraSemanal.semanaId, semanaId),
    ),
  });

  return cabecera;
}
