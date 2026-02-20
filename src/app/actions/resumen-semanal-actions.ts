"use server";

import { and, eq, sql } from "drizzle-orm";

import { PamCabeceraSemanal, PamSemanas } from "@/db/schema";
import { db } from "@/lib/drizzle";
import {
  ResumenAnalista,
  ResumenSemanalRow,
} from "@/interfaces/resumen-semanal";
import { getSessionUserWithCookies } from "./auth-actions";

export async function getResumenMensual(
  mes: string,
  año: number = new Date().getFullYear(),
): Promise<ResumenAnalista> {
  const { user } = await getSessionUserWithCookies();
  const userId = Number(user.id);

  if (!userId) {
    throw new Error("No autorizado");
  }

  const resultados: ResumenAnalista = {
    cantidadSemanas: 0,
    datos: [],
  };

  // Obtener las cabeceras semanales del analista para el mes
  const cabeceras = await db.query.PamCabeceraSemanal.findMany({
    where: and(
      eq(PamCabeceraSemanal.analistaId, userId),
      sql`${PamCabeceraSemanal.semanaId} IN (
          SELECT id FROM ${PamSemanas} 
          WHERE descripcion LIKE ${`%${año}%`} 
          AND descripcion LIKE ${`%${mes}%`}
        )`,
    ),
    with: {
      semana: true,
    },
  });

  //obtener cantidad de semanas por mes
  const semanasPorMes = await db.query.PamSemanas.findMany({
    where: and(
      sql`${PamSemanas.descripcion} LIKE ${`%${año}%`}`,
      sql`${PamSemanas.descripcion} LIKE ${`%${mes}%`}`,
    ),
  });

  const cantidadSemanas = semanasPorMes.length;

  // Crear las filas del resumen
  const datos: ResumenSemanalRow[] = [
    {
      categoria: "SALDO ANTERIOR",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.saldoAnterior, 0),
    },
    {
      categoria: "NUEVO INGRESO",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.nuevoIngreso, 0),
    },
    {
      categoria: "CIRCULACION",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.circulacion, 0),
    },
    {
      categoria: "RESUELTO",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.resuelto, 0),
    },
    {
      categoria: "CON LUGAR",
      esSubcategoria: true,
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.conLugar, 0),
    },
    {
      categoria: "SIN LUGAR",
      esSubcategoria: true,
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.sinLugar, 0),
    },
    {
      categoria: "PARCIAL",
      esSubcategoria: true,
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.parcial, 0),
    },
    {
      categoria: "CADUCADO",
      esSubcategoria: true,
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.caducado, 0),
    },
    {
      categoria: "DICTAMEN",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.dictamen, 0),
    },
    {
      categoria: "REQUERIDO",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.requerido, 0),
    },
    {
      categoria: "PENDIENTE",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.pendiente, 0),
    },
    {
      categoria: "HISTORICO ACUMULADO",
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      total: cabeceras.reduce((sum, c) => sum + c.historicoCirculacion, 0),
    },
  ];

  // Distribuir los valores por semana
  cabeceras.forEach((cabecera, index) => {
    if (index < cantidadSemanas) {
      const semana = cabecera.semana.descripcion.split(" - ").at(0)?.at(-1);

      const weekKey = `semana${semana}` as keyof ResumenSemanalRow;

      datos.forEach((fila) => {
        switch (fila.categoria) {
          case "SALDO ANTERIOR":
            fila[weekKey] = cabecera.saldoAnterior;
            break;
          case "NUEVO INGRESO":
            fila[weekKey] = cabecera.nuevoIngreso;
            break;
          case "CIRCULACION":
            fila[weekKey] = cabecera.circulacion;
            break;
          case "RESUELTO":
            fila[weekKey] = cabecera.resuelto;
            break;
          case "CON LUGAR":
            fila[weekKey] = cabecera.conLugar;
            break;
          case "SIN LUGAR":
            fila[weekKey] = cabecera.sinLugar;
            break;
          case "PARCIAL":
            fila[weekKey] = cabecera.parcial;
            break;
          case "CADUCADA":
            fila[weekKey] = cabecera.caducado;
            break;
          case "DICTAMEN":
            fila[weekKey] = cabecera.dictamen;
            break;
          case "REQUERIDO":
            fila[weekKey] = cabecera.requerido;
            break;
          case "PENDIENTE":
            fila[weekKey] = cabecera.pendiente;
            break;
          case "HISTORICO ACUMULADO":
            fila[weekKey] = cabecera.historicoCirculacion;
            break;
        }
      });
    }
  });

  resultados.datos.push(...datos);
  resultados.cantidadSemanas = cantidadSemanas;
  return resultados;
}
