import { db } from "@/lib/drizzle";
import {
  PamAnalista,
  PamExpedientes,
  PamSemanas,
  PamCabeceraSemanal,
} from "@/db/schema";
import { eq, and, inArray, notInArray, max, desc } from "drizzle-orm";
import { IReasignacionesRepository } from "../interfaces/IReasignacionesRepository";
import { IReasignacionExpediente } from "../interfaces/IReasignacionExpediente";
import { ActionsResponse } from "@/shared/types/actions-response";
import { CADUCADO, CON_LUGAR, PARCIAL, PENDIENTE, SIN_LUGAR } from "@/const";
import { buildWeek, validateEstado } from "@/shared/utils";
import { mapColumnDb } from "@/shared/utils/mappers";

class ReasignacionesRepository implements IReasignacionesRepository {
  async reasignar(
    expedienteId: number,
    nuevoAnalistaId: number,
  ): Promise<ActionsResponse> {
    //buscar el nuevo expediente y actualizarlo con el nuevo analista
    const expediente = await db.query.PamExpedientes.findFirst({
      where: eq(PamExpedientes.id, expedienteId),
    });

    if (!expediente) {
      return {
        success: false,
        message: "Expediente no encontrado",
      };
    }

    //Verificar que el expediente no esta resuelto
    if ([CON_LUGAR, SIN_LUGAR, PARCIAL, CADUCADO].includes(expediente.estado)) {
      return {
        success: false,
        message: "Expediente ya está resuelto",
      };
    }

    const cantidadExpedientes = await db.query.PamExpedientes.findMany({
      where: eq(PamExpedientes.expediente, expediente.expediente),
    });

    // Verificar si el expediente es nuevo (true) o historico (false)
    const isExpedienteNuevo = cantidadExpedientes.length === 1;
    const estadoExpedienteColumn = validateEstado(expediente.estado);
    const semanaString = buildWeek();
    const semanaActual = await db.query.PamSemanas.findFirst({
      where: eq(PamSemanas.descripcion, semanaString),
    });

    console.log("semanaActual", semanaActual);

    if (!semanaActual) {
      return {
        success: false,
        message: "Hubo un error al obtener la semana actual",
      };
    }

    const [cabeceraSemanalAnalistaNuevo, cabeceraSemanalAnalistaAnterior] =
      await Promise.all([
        db.query.PamCabeceraSemanal.findFirst({
          where: and(
            eq(PamCabeceraSemanal.semanaId, semanaActual.id),
            eq(PamCabeceraSemanal.analistaId, nuevoAnalistaId),
          ),
        }),
        db.query.PamCabeceraSemanal.findFirst({
          where: and(
            eq(PamCabeceraSemanal.semanaId, expediente.semanaId),
            eq(PamCabeceraSemanal.analistaId, expediente.analistaId),
          ),
        }),
      ]);

    if (!cabeceraSemanalAnalistaNuevo) {
      return {
        success: false,
        message: "El nuevo analista no ha creado la semana actual",
      };
    }

    if (!cabeceraSemanalAnalistaAnterior) {
      return {
        success: false,
        message: "Hubo un error al obtener las cabeceras semanal",
      };
    }

    //acciones para cabecera semana al que se le asigna el expediente
    cabeceraSemanalAnalistaNuevo.nuevoIngreso += 1;
    cabeceraSemanalAnalistaNuevo[mapColumnDb[estadoExpedienteColumn]] += 1;

    cabeceraSemanalAnalistaNuevo.dictamen =
      cabeceraSemanalAnalistaNuevo.dictamen +
      cabeceraSemanalAnalistaNuevo.dictamenCirculacion +
      cabeceraSemanalAnalistaNuevo.dictamenCustodia;

    cabeceraSemanalAnalistaNuevo.resuelto =
      cabeceraSemanalAnalistaNuevo.conLugar +
      cabeceraSemanalAnalistaNuevo.sinLugar +
      cabeceraSemanalAnalistaNuevo.parcial +
      cabeceraSemanalAnalistaNuevo.caducado;

    console.log({ isExpedienteNuevo, expediente });

    //acciones para cabecera semanal del analista que pierde el expediente
    if (isExpedienteNuevo) {
      if (expediente.isHistorico === "S") {
        cabeceraSemanalAnalistaAnterior[mapColumnDb[estadoExpedienteColumn]] -=
          1;
      } else {
        cabeceraSemanalAnalistaAnterior.nuevoIngreso -= 1;
        cabeceraSemanalAnalistaAnterior[mapColumnDb[estadoExpedienteColumn]] -=
          1;
      }
    } else {
      if (expediente.isHistorico === "S") {
        //verificar pendientes, requeridos etc

        if (expediente.estado === PENDIENTE) {
          cabeceraSemanalAnalistaAnterior.saldoAnterior -= 1;
          cabeceraSemanalAnalistaAnterior.pendiente -= 1;
        } else {
          cabeceraSemanalAnalistaAnterior.historicoCirculacion -= 1;
        }
      }

      if (expediente.isHistorico === "E") {
        cabeceraSemanalAnalistaAnterior.circulacion -= 1;
        cabeceraSemanalAnalistaAnterior[mapColumnDb[estadoExpedienteColumn]] -=
          1;
      }
    }

    cabeceraSemanalAnalistaAnterior.dictamen =
      cabeceraSemanalAnalistaAnterior.dictamen +
      cabeceraSemanalAnalistaAnterior.dictamenCirculacion +
      cabeceraSemanalAnalistaAnterior.dictamenCustodia;

    cabeceraSemanalAnalistaAnterior.resuelto =
      cabeceraSemanalAnalistaAnterior.conLugar +
      cabeceraSemanalAnalistaAnterior.sinLugar +
      cabeceraSemanalAnalistaAnterior.parcial +
      cabeceraSemanalAnalistaAnterior.caducado;

    await db.transaction(async (tx) => {
      // actualizar la cabecera del analista anterior
      await tx
        .update(PamCabeceraSemanal)
        .set(cabeceraSemanalAnalistaAnterior)
        .where(eq(PamCabeceraSemanal.id, cabeceraSemanalAnalistaAnterior.id));

      // actualizar la cabecera del analista nuevo
      await tx
        .update(PamCabeceraSemanal)
        .set(cabeceraSemanalAnalistaNuevo)
        .where(eq(PamCabeceraSemanal.id, cabeceraSemanalAnalistaNuevo.id));

      // actualizar expediente con el nuevo analista
      await tx
        .update(PamExpedientes)
        .set({
          analistaId: nuevoAnalistaId,
          isHistorico: "N",
        })
        .where(eq(PamExpedientes.id, expedienteId));
    });

    return {
      success: true,
      message: "Expediente reasignado correctamente",
    };
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
