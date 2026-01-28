"use server";

import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { PamCabeceraSemanal, PamSemanas } from "@/db/schema";
import { auth } from "../auth.config";
import { Semana } from "@/responses";
import { ExpedienteSchemaType } from "@/schemas";
import { refresh, revalidatePath } from "next/cache";

export async function getSemana(): Promise<Semana | null> {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  console.log("consultandos semana");

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

  return semana || null;
}

export async function createExpediente(data: ExpedienteSchemaType) {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  const expediente = await db.insert(PamExpedientes).values({
    expediente: data.expediente,
    analistaId: userId,
    semanaId: 1,
    fechaIngreso: new Date().toISOString().toString(),
    estado: data.estado,
    fechaUltimaModificacion: "",
  });

  console.log(JSON.stringify(expediente, null, 2));

  revalidatePath("/");
}
