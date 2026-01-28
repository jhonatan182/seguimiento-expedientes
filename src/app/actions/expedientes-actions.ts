"use server";

import { auth } from "../auth.config";
import { db } from "@/lib/drizzle";
import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { eq } from "drizzle-orm";
import { PamCabeceraSemanal } from "@/db/schema/PAM_CABECERA_SEMANAL";
import { PamSemanas } from "@/db/schema/PAM_SEMANAS";

export async function getExpedientesDiarios() {
  const usuario = await auth();

  if (!usuario?.user) {
    return [];
  }

  const userId = Number(usuario.user.id);

  //consultar la base de datos en la tabla PAM_EXPEDIENTES e inner join con la tabla PAM_CABECERA_SEMANAL y PAM_SEMANAS
  const expedientes = await db
    .select()
    .from(PamExpedientes)
    .innerJoin(
      PamCabeceraSemanal,
      eq(PamExpedientes.semanaId, PamCabeceraSemanal.semanaId),
    )
    .innerJoin(PamSemanas, eq(PamCabeceraSemanal.semanaId, PamSemanas.id))
    .where(eq(PamExpedientes.analistaId, userId));

  console.log(JSON.stringify(expedientes, null, 2));

  return expedientes;
}
