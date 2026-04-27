import { and, eq, inArray } from "drizzle-orm";

import { ICabecerasRepository } from "../interfaces/ICabecerasRepository";
import { ActionsResponse } from "@/shared/types/actions-response";
import { cabecerasRepository } from "./CabecerasRepository";
import { PamExpedientes } from "@/db/schema";
import { db } from "@/lib/drizzle";
import {
  DICTAMEN,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  PENDIENTE,
  REQUERIDO,
} from "@/const";

class CabecerasService {
  constructor(private readonly cabecerasRepository: ICabecerasRepository) {}

  async getCabeceraSemanal(userId: number, semanaId: number) {
    return await this.cabecerasRepository.getCabeceraSemanal(userId, semanaId);
  }

  async buildNextCabeceraSemanal(
    userId: number,
    semanaId: number,
  ): Promise<ActionsResponse> {
    const cabecera = await this.getCabeceraSemanal(userId, semanaId);

    if (!cabecera) {
      return {
        success: false,
        message: "No se encontró la cabecera",
      };
    }

    const expedientesSemanaAnterior = await db.query.PamExpedientes.findMany({
      where: and(
        eq(PamExpedientes.semanaId, semanaId),
        eq(PamExpedientes.analistaId, userId),
        inArray(PamExpedientes.estado, [
          PENDIENTE,
          DICTAMEN,
          DICTAMEN_CIRCULACION,
          DICTAMEN_CUSTODIA,
          REQUERIDO,
        ]),
      ),
    });

    if (expedientesSemanaAnterior.length === 0) {
      return {
        message: "No hay expedientes para migrar",
        success: false,
      };
    }

    //buscar cabecera de la semana siguiente
    const cabeceraSiguiente = await this.getCabeceraSemanal(
      userId,
      semanaId + 1,
    );

    const expedientesToInsert = expedientesSemanaAnterior.map((expediente) => ({
      expediente: expediente.expediente,
      analistaId: expediente.analistaId,
      semanaId: semanaId + 1,
      fechaIngreso: expediente.fechaIngreso,
      estado: expediente.estado,
      fechaUltimaModificacion: expediente.fechaUltimaModificacion || "",
      isHistorico: "S",
    }));

    return await this.cabecerasRepository.buildNextCabeceraSemanal(
      userId,
      semanaId,
      cabecera,
      cabeceraSiguiente!,
      expedientesToInsert,
    );
  }
}

export const cabecerasService = new CabecerasService(cabecerasRepository);
