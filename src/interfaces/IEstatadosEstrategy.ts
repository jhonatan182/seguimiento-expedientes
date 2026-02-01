import { PamCabeceraSemanalType } from "@/db/schema";
import { ICambioEstado } from "./ICambioEstado";

export interface IEstatadosEstrategy {
  satisfy(cambioEstado: ICambioEstado): boolean;
  execute(
    cabeceraSemanal: PamCabeceraSemanalType,
    columnaDb: keyof PamCabeceraSemanalType,
    columnaDbAnterior: keyof PamCabeceraSemanalType,
    nuevoEstado: string,
    expedienteId: number,
    userId: number,
  ): void;
}
