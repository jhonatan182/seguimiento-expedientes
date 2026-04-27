"use server";

import { revalidatePath } from "next/cache";
import { reasignacionesService } from "../services/ReasignacionesService";

export async function getReasignaciones() {
  return reasignacionesService.getReasignaciones();
}

export async function reasignarExpedienteAction(expedienteId: number, nuevoAnalistaId: number) {
  // return reasignacionesService.reasignarExpediente(id, analistaId);
  console.log("Reasignando expediente", { expedienteId, nuevoAnalistaId });
  
  const resp = await reasignacionesService.reasignarExpediente(expedienteId, nuevoAnalistaId);

  revalidatePath("/reasignar-expedientes");

  return resp;
}
