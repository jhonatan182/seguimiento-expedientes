import { ActionsResponse } from "@/shared/types/actions-response";
import { IReasignacionExpediente } from "./IReasignacionExpediente";

export interface IReasignacionesRepository {
  getReasignaciones(modulo: string, oficina: string): Promise<IReasignacionExpediente[]>;
  reasignar(expedienteId: number, nuevoAnalistaId: number): Promise<ActionsResponse>;
}
