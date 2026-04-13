import { db } from "@/lib/drizzle";
import { PamAnalista, PamExpedientes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { IReasignacionesRepository } from "../interfaces/IReasignacionesRepository";
import { IReasignacionExpediente } from "../interfaces/IReasignacionExpediente";


class ReasignacionesRepository implements IReasignacionesRepository {
  async getReasignaciones(modulo: string, oficina: string): Promise<IReasignacionExpediente[]> {

    //Obtener analistas disponibles
    const analistasDisponibles = await db.query.PamAnalista.findMany({
      where: and(
        eq(PamAnalista.modulo, modulo),
        eq(PamAnalista.oficina, oficina),
        eq(PamAnalista.isActivo, "S")
      ),
      columns: {
        id: true,
        nombre: true,
        usuario: true,
      },
    });

    //Obtener expedientes con su analista actual
    const expedientes = await db.query.PamExpedientes.findMany({
      with: {
        analista: {
          columns: {
            id: true,
            nombre: true,
            usuario: true,
            modulo: true,
            oficina: true,
          },
        },
      },
      where: and(
        eq(PamExpedientes.estado, "PENDIENTE"),
      )
      
    });

    //Filtrar expedientes que se pueden reasignar y mapearlos
    const expedientesReasignables = expedientes
      .filter(expediente => {
        // Verificar que el analista actual esté en el mismo módulo y oficina
        return expediente.analista.modulo === modulo && expediente.analista.oficina === oficina;
      })
      .map(expediente => {
        // Filtrar el analista actual de los disponibles
        const analistasParaReasignar = analistasDisponibles.filter(
          analista => analista.id !== expediente.analista.id
        );

        return {
          id: expediente.id,
          expediente: expediente.expediente,
          analistaActual: expediente.analista,
          analistasDisponibles: analistasParaReasignar,
        };
      })
      .filter(expediente => expediente.analistasDisponibles.length > 0); //     Solo incluir si hay analistas disponibles

    // console.log("getReasignaciones repository", modulo, oficina, {
    //   totalExpedientes: expedientes.length,
    //   expedientesReasignables: JSON.stringify(expedientesReasignables[0]),
    //   analistasDisponibles: JSON.stringify(analistasDisponibles),
    // });

    return expedientesReasignables;
  }
}

export const reasignacionesRepository = new ReasignacionesRepository();
