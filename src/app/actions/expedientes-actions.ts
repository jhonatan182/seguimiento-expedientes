"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";

import { ExpedienteSchemaType, UpdateExpedienteSchemaType } from "@/schemas";
import { getCabeceraSemanal } from "./cabecera-semanal-actions";
import { PamExpedientes } from "@/db/schema/PAM_EXPEDIENTES";
import { PamCabeceraSemanal, PamSemanas } from "@/db/schema";
import { getSessionUserWithCookies } from "./auth-actions";
import { ContextStrategy } from "@/rdn/contextStategy";
import {
  incrementarEstadoDictamen,
  incrementarEstadoResuelto,
  validateEstado,
} from "@/utils/validations";
import { stragiesList } from "@/rdn/strategies";
import { mapColumnDb } from "@/utils/mappers";
import { ActionsResponse, Semana } from "@/responses";
import { auth } from "../auth.config";
import { IExecuteData } from "@/interfaces";
import { redirect } from "next/navigation";

export async function getExpedientes(semanaId: number): Promise<Semana | null> {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/login");
  }

  const userId = Number(session?.user?.id);

  const semana = await db.query.PamSemanas.findFirst({
    where: eq(PamSemanas.id, semanaId),
    with: {
      expedientes: {
        where: eq(PamExpedientes.analistaId, userId),
        orderBy: (expedientes, { desc }) => [desc(expedientes.id)],
      },
      cabeceras: {
        where: eq(PamCabeceraSemanal.analistaId, userId),
      },
    },
  });

  return semana || null;
}

export async function expedienteExists(
  expediente: string,
  userId: number,
  semanaId: number,
  excludeId?: number,
): Promise<boolean> {
  const conditions = [
    eq(PamExpedientes.analistaId, userId),
    eq(PamExpedientes.semanaId, semanaId),
    eq(PamExpedientes.expediente, expediente.toUpperCase()),
  ];

  if (excludeId) {
    conditions.push(eq(PamExpedientes.id, excludeId));
  }

  const existing = await db.query.PamExpedientes.findFirst({
    where: and(...conditions),
  });

  return !!existing;
}

async function findExpedienteWithPermissions(
  expedienteId: number,
  userId: number,
  semanaId: number,
) {
  const expediente = await db.query.PamExpedientes.findFirst({
    where: and(
      eq(PamExpedientes.id, expedienteId),
      eq(PamExpedientes.analistaId, userId),
      eq(PamExpedientes.semanaId, semanaId),
    ),
  });

  return expediente;
}

export async function createExpediente(
  data: ExpedienteSchemaType,
): Promise<ActionsResponse> {
  const { user, cookies } = await getSessionUserWithCookies();
  const userId = Number(user.id);
  const semanaId = cookies.semanaId;

  //Validar el estado
  const estadoValido = validateEstado(data.estado);
  const columnaDb = mapColumnDb[estadoValido];

  //buscar si el analista ya creo el mismo expediente en la misma semana
  const expediente = await expedienteExists(data.expediente, userId, semanaId);

  if (expediente) {
    return {
      success: false,
      message: "El expediente ya existe en la misma semana",
    };
  }

  await db.transaction(async (tx) => {
    //Crear expediente
    await tx.insert(PamExpedientes).values({
      expediente: data.expediente.toUpperCase(),
      analistaId: userId,
      semanaId: semanaId,
      fechaIngreso: new Date(data.fechaIngreso + "T00:00:00").toISOString(),
      estado: estadoValido,
      fechaUltimaModificacion: "",
    });

    //verficar si existe cabecera en la semana que se esta creando el expediente
    const cabecera = await getCabeceraSemanal(userId, semanaId);

    if (!cabecera) {
      await tx.insert(PamCabeceraSemanal).values({
        semanaId: semanaId,
        analistaId: userId,
        nuevoIngreso: 1,
        [columnaDb]: 1,
        resuelto: incrementarEstadoResuelto(estadoValido) ? 1 : 0,
        dictamen: incrementarEstadoDictamen(estadoValido) ? 1 : 0,
      });
    } else {
      await tx
        .update(PamCabeceraSemanal)
        .set({
          nuevoIngreso: cabecera.nuevoIngreso + 1,
          [columnaDb]: cabecera[columnaDb] + 1,
          resuelto: incrementarEstadoResuelto(estadoValido)
            ? cabecera.resuelto + 1
            : cabecera.resuelto,
          dictamen: incrementarEstadoDictamen(estadoValido)
            ? cabecera.dictamen + 1
            : cabecera.dictamen,
        })
        .where(
          and(
            eq(PamCabeceraSemanal.semanaId, semanaId),
            eq(PamCabeceraSemanal.analistaId, userId),
          ),
        );
    }
  });

  revalidatePath("/");
  return {
    success: true,
    message: "Expediente creado exitosamente",
  };
}

export async function updateExpediente(
  expedienteId: number,
  data: UpdateExpedienteSchemaType,
): Promise<ActionsResponse> {
  const { user, cookies } = await getSessionUserWithCookies();
  const userId = Number(user.id);
  const semanaId = cookies.semanaId;

  const expediente = await expedienteExists(data.expediente, userId, semanaId);

  if (expediente) {
    return {
      success: false,
      message: "El expediente ya existe en la misma semana",
    };
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
  return {
    success: true,
    message: "Expediente actualizado exitosamente",
  };
}

export async function deleteExpediente(
  expedienteId: number,
): Promise<ActionsResponse> {
  const { user, cookies } = await getSessionUserWithCookies();
  const userId = Number(user.id);
  const semanaId = cookies.semanaId;

  //buscar si el analista ya creo el mismo expediente en la misma semana
  const expediente = await findExpedienteWithPermissions(
    expedienteId,
    userId,
    semanaId,
  );

  if (!expediente) {
    return {
      success: false,
      message: "El expediente no existe",
    };
  }

  const estadoValido = validateEstado(expediente.estado);

  await db.transaction(async (tx) => {
    // buscar cabecera
    const cabecera = await getCabeceraSemanal(userId, semanaId);

    if (!cabecera) {
      return {
        success: false,
        message: "La cabecera no existe",
      };
    }

    const columnaDb = mapColumnDb[estadoValido];
    const newNuevoIngreso = cabecera.nuevoIngreso - 1;
    const newEstadoCount = cabecera[columnaDb] - 1;

    if (newNuevoIngreso < 0 || newEstadoCount < 0) {
      return {
        success: false,
        message: "Los contadores de la cabecera no pueden ser negativos",
      };
    }

    // actualizar cabecera
    await tx
      .update(PamCabeceraSemanal)
      .set({
        nuevoIngreso: newNuevoIngreso,
        [columnaDb]: newEstadoCount,
        dictamen: incrementarEstadoDictamen(estadoValido)
          ? cabecera.dictamen - 1
          : cabecera.dictamen,
      })
      .where(
        and(
          eq(PamCabeceraSemanal.semanaId, semanaId),
          eq(PamCabeceraSemanal.analistaId, userId),
        ),
      );

    // eliminar
    await tx
      .delete(PamExpedientes)
      .where(
        and(
          eq(PamExpedientes.id, expedienteId),
          eq(PamExpedientes.analistaId, userId),
          eq(PamExpedientes.semanaId, semanaId),
        ),
      );
  });

  revalidatePath("/");
  return {
    success: true,
    message: "Expediente eliminado exitosamente",
  };
}

export async function toggleExpedienteEstado(
  expedienteId: number,
  nuevoEstado: string,
): Promise<ActionsResponse> {
  const { user, cookies } = await getSessionUserWithCookies();
  const userId = Number(user.id);
  const semanaId = cookies.semanaId;

  const estadoValido = validateEstado(nuevoEstado);

  const expediente = await findExpedienteWithPermissions(
    expedienteId,
    userId,
    semanaId,
  );

  if (!expediente) {
    return {
      success: false,
      message: "El expediente no existe",
    };
  }

  const estadoAnterior = validateEstado(expediente.estado);

  const columnaDb = mapColumnDb[estadoValido];
  const columnaDbAnterior = mapColumnDb[estadoAnterior];

  //actualizar la cabecera con el nuevo estado y restarle el estado anterior
  const cabecera = await db.query.PamCabeceraSemanal.findFirst({
    where: and(
      eq(PamCabeceraSemanal.semanaId, semanaId),
      eq(PamCabeceraSemanal.analistaId, userId),
    ),
  });

  if (!cabecera) {
    return {
      success: false,
      message: "La cabecera no existe",
    };
  }

  const strategy = stragiesList.find((s) =>
    s.satisfy({ estadoActual: expediente.estado, nuevoEstado: nuevoEstado }),
  );

  const dataStrategy: IExecuteData = {
    cabeceraSemanal: cabecera,
    columnaDb: columnaDb,
    columnaDbAnterior: columnaDbAnterior,
    nuevoEstado: nuevoEstado,
    expediente: expediente,
  };

  if (!strategy) {
    return {
      success: false,
      message: "No se pudo cambiar el estado del expediente",
    };
  } else {
    //ejucutar strategy
    const context = new ContextStrategy(strategy);

    await context.cambioEstado(dataStrategy);
  }

  revalidatePath("/");
  return {
    success: true,
    message: "Expediente actualizado exitosamente",
  };
}
