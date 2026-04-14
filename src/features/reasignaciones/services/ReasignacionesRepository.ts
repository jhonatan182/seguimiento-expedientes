import { db } from "@/lib/drizzle";
import { PamAnalista, PamExpedientes } from "@/db/schema";
import { eq, and, inArray, notInArray, max, desc } from "drizzle-orm";
import { IReasignacionesRepository } from "../interfaces/IReasignacionesRepository";
import { IReasignacionExpediente } from "../interfaces/IReasignacionExpediente";

class ReasignacionesRepository implements IReasignacionesRepository {
  async reasignar(
    expedienteId: number,
    nuevoAnalistaId: number,
  ): Promise<void> {
    //buscar el nuevo expediente y actualizarlo con el nuevo analista
    const nuevoExpediente = await db.query.PamExpedientes.findFirst({
      where: eq(PamExpedientes.id, expedienteId),
    });

    if (!nuevoExpediente) {
      throw new Error("Expediente no encontrado");
    }

    await db
      .update(PamExpedientes)
      .set({
        analistaId: nuevoAnalistaId,
      })
      .where(eq(PamExpedientes.id, expedienteId));
  }

  async getReasignaciones(
    modulo: string,
    oficina: string,
  ): Promise<IReasignacionExpediente[]> {
    //Obtener analistas disponibles
    const analistasDisponibles = await db.query.PamAnalista.findMany({
      where: and(
        eq(PamAnalista.modulo, modulo),
        eq(PamAnalista.oficina, oficina),
        eq(PamAnalista.isActivo, "S"),
      ),
      columns: {
        id: true,
        nombre: true,
        usuario: true,
      },
    });

    //Obtener el último registro de cada expediente con su analista actual
    const expedientes = await db
      .select({
        id: PamExpedientes.id,
        expediente: PamExpedientes.expediente,
        estado: PamExpedientes.estado,
        analistaId: PamExpedientes.analistaId,
        analista: {
          id: PamAnalista.id,
          nombre: PamAnalista.nombre,
          usuario: PamAnalista.usuario,
          modulo: PamAnalista.modulo,
          oficina: PamAnalista.oficina,
        },
      })
      .from(PamExpedientes)
      .innerJoin(PamAnalista, eq(PamExpedientes.analistaId, PamAnalista.id))
      .where(
        and(
          inArray(
            PamExpedientes.id,
            db
              .select({ maxId: max(PamExpedientes.id) })
              .from(PamExpedientes)
              .groupBy(PamExpedientes.expediente),
          ),
          // Excluir expedientes con estados resueltos
          notInArray(PamExpedientes.estado, [
            "CON_LUGAR",
            "SIN_LUGAR",
            "PARCIAL",
            "CADUCADO",
          ]),
        ),
      )
      .orderBy(desc(PamExpedientes.id));

    //Filtrar expedientes que se pueden reasignar y mapearlos
    const expedientesReasignables = expedientes
      .filter((expediente) => {
        // Verificar que el analista actual esté en el mismo módulo y oficina
        return (
          expediente.analista.modulo === modulo &&
          expediente.analista.oficina === oficina
        );
      })
      .map((expediente) => {
        // Filtrar el analista actual de los disponibles
        const analistasParaReasignar = analistasDisponibles.filter(
          (analista) => analista.id !== expediente.analista.id,
        );

        return {
          id: expediente.id,
          expediente: expediente.expediente,
          estado: expediente.estado,
          analistaActual: expediente.analista,
          analistasDisponibles: analistasParaReasignar,
        };
      })
      .filter((expediente) => expediente.analistasDisponibles.length > 0); //     Solo incluir si hay analistas disponibles

    // console.log("getReasignaciones repository", modulo, oficina, {
    //   totalExpedientes: expedientes.length,
    //   expedientesReasignables: JSON.stringify(expedientesReasignables[0]),
    //   analistasDisponibles: JSON.stringify(analistasDisponibles),
    // });

    return expedientesReasignables;
  }
}

export const reasignacionesRepository = new ReasignacionesRepository();
