"use server";

import { revalidatePath } from "next/cache";

import { getCookie } from "../../../shared/actions/cookies-actions";
import { ActionsResponse } from "@/shared/types/actions-response";
import { cabecerasService } from "../services/CabecerasService";
import { auth } from "@/app/auth.config";

export async function getCabeceraSemanalAction(
  userId: number,
  semanaId: number,
) {
  //verificar si existe cabecera en la semana que se esta creando el expediente
  const cabecera = await cabecerasService.getCabeceraSemanal(userId, semanaId);

  return cabecera;
}

export async function buildNextCabeceraSemanalAction(): Promise<ActionsResponse> {
  const [session, semanaIdCookie] = await Promise.all([
    auth(),
    getCookie("semanaId"),
  ]);

  if (!session) {
    return {
      message: "No se encontró la sesión",
      success: false,
    };
  }

  if (!semanaIdCookie) {
    return {
      message: "No se encontró la semana",
      success: false,
    };
  }

  const user = session.user;

  const semanaId = parseInt(semanaIdCookie);
  const userId = parseInt(user.id);

  const result = await cabecerasService.buildNextCabeceraSemanal(
    userId,
    semanaId,
  );

  if (!result.success) {
    return {
      message: result.message,
      success: false,
    };
  }

  revalidatePath("/?semana=" + (semanaId + 1));

  return {
    success: true,
    message: "Actualización exitosa",
  };
}
