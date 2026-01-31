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
import { mapColumnDb, ESTADOS_VALIDOS, EstadoValido } from "@/utils/mappers";

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

  //buscar si el analista ya creo el mismo expediente en la misma semana
  const expediente = await db.query.PamExpedientes.findFirst({
    where: and(
      eq(PamExpedientes.analistaId, userId),
      eq(PamExpedientes.semanaId, semanaId),
      eq(PamExpedientes.expediente, data.expediente.toUpperCase()),
    ),
  });

  if (expediente) {
    throw new Error("El expediente ya existe en la misma semana");
  }

  //Crear expediente
  await db.insert(PamExpedientes).values({
    expediente: data.expediente.toUpperCase(),
    analistaId: userId,
    semanaId: semanaId,
    fechaIngreso: new Date().toISOString().toString(),
    estado: data.estado,
    fechaUltimaModificacion: "",
  });

  //verficar si existe cabecera en la semana que se esta creando el expediente
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.analistaId, userId),
      eq(PamCabeceraSemanal.semanaId, semanaId),
    ),
  });

  // Validate that the estado is a valid state
  if (!ESTADOS_VALIDOS.includes(data.estado as EstadoValido)) {
    throw new Error(`Estado inválido: ${data.estado}`);
  }

  const estadoValido = data.estado as EstadoValido;
  const columnaDb = mapColumnDb[estadoValido];

  if (!cabecera) {
    await db.insert(PamCabeceraSemanal).values({
      semanaId: semanaId,
      analistaId: userId,
      nuevoIngreso: 1,
      [columnaDb]: 1,
    });
  } else {
    await db.update(PamCabeceraSemanal).set({
      semanaId: semanaId,
      analistaId: userId,
      nuevoIngreso: cabecera.nuevoIngreso + 1,
      [columnaDb]: cabecera[columnaDb] + 1,
    });
  }

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

  const cookieStore = await cookies();
  const semanaCookieId = cookieStore.get("semanaId")?.value;
  const semanaId = semanaCookieId ? parseInt(semanaCookieId) : 1;

  const userId = Number(usuario.user.id);

  const expediente = await db.query.PamExpedientes.findFirst({
    where: and(
      eq(PamExpedientes.analistaId, userId),
      eq(PamExpedientes.semanaId, semanaId),
      eq(PamExpedientes.expediente, data.expediente.toUpperCase()),
    ),
  });

  if (expediente) {
    throw new Error("El expediente ya existe en la misma semana");
  }

  // actualizar
  await db
    .update(PamExpedientes)
    .set({
      expediente: data.expediente.toUpperCase(),
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

  const cookieStore = await cookies();
  const semanaCookieId = cookieStore.get("semanaId")?.value;
  const semanaId = semanaCookieId ? parseInt(semanaCookieId) : 1;

  const userId = Number(usuario.user.id);

  //buscar si el analista ya creo el mismo expediente en la misma semana
  const expediente = await db.query.PamExpedientes.findFirst({
    where: and(
      eq(PamExpedientes.analistaId, userId),
      eq(PamExpedientes.semanaId, semanaId),
      eq(PamExpedientes.id, expedienteId),
    ),
  });

  if (!expediente) {
    throw new Error("El expediente no existe");
  }

  // buscar cabecera
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.analistaId, userId),
      eq(PamCabeceraSemanal.semanaId, semanaId),
    ),
  });

  if (!cabecera) {
    throw new Error("La cabecera no existe");
  }

  const estadoValido = expediente.estado as EstadoValido;
  const columnaDb = mapColumnDb[estadoValido];

  //actualizar con resta la cabecera
  await db.update(PamCabeceraSemanal).set({
    nuevoIngreso: cabecera.nuevoIngreso - 1,
    [columnaDb]: cabecera[columnaDb] - 1,
  });

  // eliminar
  await db
    .delete(PamExpedientes)
    .where(
      and(
        eq(PamExpedientes.id, expedienteId),
        eq(PamExpedientes.analistaId, userId),
        eq(PamExpedientes.semanaId, semanaId),
      ),
    );

  revalidatePath("/");
}

export async function toggleExpedienteEstado(
  expedienteId: number,
  nuevoEstado: string,
) {
  const usuario = await auth();
  const cookieStore = await cookies();

  if (!usuario?.user) {
    return null;
  }

  const userId = Number(usuario.user.id);
  const semanaCookieId = cookieStore.get("semanaId")?.value;
  const semanaId = semanaCookieId ? parseInt(semanaCookieId) : 1;

  const expediente = await db.query.PamExpedientes.findFirst({
    where: and(
      eq(PamExpedientes.analistaId, userId),
      eq(PamExpedientes.semanaId, semanaId),
      eq(PamExpedientes.id, expedienteId),
    ),
  });

  if (!expediente) {
    throw new Error("El expediente no existe");
  }

  if (!ESTADOS_VALIDOS.includes(nuevoEstado as EstadoValido)) {
    throw new Error(`Estado inválido: ${nuevoEstado}`);
  }

  const estadoValido = nuevoEstado as EstadoValido;
  const columnaDb = mapColumnDb[estadoValido];

  //estado anterior
  const estadoAnterior = expediente.estado as EstadoValido;
  const columnaDbAnterior = mapColumnDb[estadoAnterior];

  //actualizar la cabecera con el nuevo estado y restarle el estado anterior
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.semanaId, semanaId),
      eq(PamCabeceraSemanal.analistaId, userId),
    ),
  });

  if (!cabecera) {
    throw new Error("La cabecera no existe");
  }

  await db.update(PamCabeceraSemanal).set({
    [columnaDb]: cabecera[columnaDb] + 1,
    [columnaDbAnterior]: cabecera[columnaDbAnterior] - 1,
  });

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
