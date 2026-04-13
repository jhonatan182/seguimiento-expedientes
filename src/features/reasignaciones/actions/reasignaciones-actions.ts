"use server";

import { reasignacionesService } from "../services/ReasignacionesService";

export async function getReasignaciones() {

  return reasignacionesService.getReasignaciones();
}
