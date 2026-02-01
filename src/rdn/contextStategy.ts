import { IEstatadosEstrategy } from "@/interfaces";
import { PamCabeceraSemanalType } from "@/db/schema";

export class ContextStrategy {
  private strategy: IEstatadosEstrategy;

  constructor(strategy: IEstatadosEstrategy) {
    this.strategy = strategy;
  }

  public cambioEstado(
    cabeceraSemanal: PamCabeceraSemanalType,
    columnaDb: keyof PamCabeceraSemanalType,
    columnaDbAnterior: keyof PamCabeceraSemanalType,
    nuevoEstado: string,
    expedienteId: number,
    userId: number,
  ): void {
    this.strategy.execute(
      cabeceraSemanal,
      columnaDb,
      columnaDbAnterior,
      nuevoEstado,
      expedienteId,
      userId,
    );
  }
}
