import { PamCabeceraSemanalType, PamExpedienteType } from "@/db/schema";
import { ISelectOption } from "@/interfaces";

export interface Semana {
  id: number;
  descripcion: string;
  expedientes: PamExpedienteType[];
  cabeceras: PamCabeceraSemanalType[];
  estados?: ISelectOption[];
}
