import { PamCabeceraSemanalType, PamExpedienteType } from "@/db/schema";

export interface Semana {
  id: number;
  descripcion: string;
  expedientes: PamExpedienteType[];
  cabeceras: PamCabeceraSemanalType[];
}
