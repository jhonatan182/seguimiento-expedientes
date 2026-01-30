"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";

import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { PamCabeceraSemanal, PamSemanas } from "@/db/schema";
import { auth } from "../auth.config";
import { Semana } from "@/responses";
import { ExpedienteSchemaType, UpdateExpedienteSchemaType } from "@/schemas";
import { cookies } from "next/headers";

export async function getExpedientes(semanaId: number): Promise<Semana | null> {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  const semana = await db.query.PamSemanas.findFirst({
    where: eq(PamSemanas.id, semanaId),
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

  const cookieStore = await cookies();
  const semanaCookieId = cookieStore.get("semanaId")?.value;
  const semanaId = semanaCookieId ? parseInt(semanaCookieId) : 1;

  const userId = Number(usuario.user.id);

  await db.insert(PamExpedientes).values({
    expediente: data.expediente,
    analistaId: userId,
    semanaId: semanaId,
    fechaIngreso: new Date().toISOString().toString(),
    estado: data.estado,
    fechaUltimaModificacion: "",
  });

  revalidatePath("/");
}

export async function updateExpediente(
  expedienteId: number,
  data: UpdateExpedienteSchemaType,
) {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  // actualizar
  await db
    .update(PamExpedientes)
    .set({
      expediente: data.expediente,
    })
    .where(
      and(
        eq(PamExpedientes.id, expedienteId),
        eq(PamExpedientes.analistaId, userId),
      ),
    );

  revalidatePath("/");
}

export async function deleteExpediente(expedienteId: number) {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  // eliminar
  await db
    .delete(PamExpedientes)
    .where(
      and(
        eq(PamExpedientes.id, expedienteId),
        eq(PamExpedientes.analistaId, userId),
      ),
    );

  revalidatePath("/");
}

export async function toggleExpedienteEstado(
  expedienteId: number,
  nuevoEstado: string,
) {
  const usuario = await auth();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);

  await db
    .update(PamExpedientes)
    .set({
      estado: nuevoEstado,
      fechaUltimaModificacion: new Date().toISOString().toString(),
    })
    .where(
      and(
        eq(PamExpedientes.id, expedienteId),
        eq(PamExpedientes.analistaId, userId),
      ),
    );

  revalidatePath("/");
}
