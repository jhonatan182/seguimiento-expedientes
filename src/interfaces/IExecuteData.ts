import { PamCabeceraSemanalType, PamExpedienteType } from "@/db/schema";

export interface IExecuteData {
  cabeceraSemanal: PamCabeceraSemanalType;
  columnaDb: keyof PamCabeceraSemanalType;
  columnaDbAnterior: keyof PamCabeceraSemanalType;
  nuevoEstado: string;
  expediente: PamExpedienteType;
}
