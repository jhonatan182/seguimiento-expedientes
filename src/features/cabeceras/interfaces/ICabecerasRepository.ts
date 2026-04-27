import { NewPamExpedienteType, PamCabeceraSemanalType } from "@/db/schema";
import { ActionsResponse } from "@/shared/types/actions-response";

export interface ICabecerasRepository {
  getCabeceraSemanal(
    userId: number,
    semanaId: number,
  ): Promise<PamCabeceraSemanalType | undefined>;

  buildNextCabeceraSemanal(
    userId: number,
    semanaId: number,
    cabeceraActual: PamCabeceraSemanalType,
    cabeceraSiguiente: PamCabeceraSemanalType,
    expedientesToInsert: NewPamExpedienteType[],
  ): Promise<ActionsResponse>;
}
