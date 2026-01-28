"use server";

import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { PamCabeceraSemanal, PamSemanas } from "@/db/schema";
import { auth } from "../auth.config";
import { Semana } from "@/responses";

export async function getSemana(): Promise<Semana | null> {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  const semana = await db.query.PamSemanas.findFirst({
    where: eq(PamSemanas.id, 1),
    with: {
      expedientes: {
        where: eq(PamExpedientes.analistaId, userId),
      },
      cabeceras: {
        where: eq(PamCabeceraSemanal.analistaId, userId),
      },
    },
  });

  console.log(JSON.stringify(semana, null, 2));

  return semana || null;
}
