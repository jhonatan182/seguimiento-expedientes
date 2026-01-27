import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { PamSemanas } from "./PAM_SEMANAS";

export const PamCabeceraSemanal = sqliteTable("PAM_CABECERA_SEMANAL", {
  id: int().primaryKey({ autoIncrement: true }),
  semanaId: int("semana_id")
    .references(() => PamSemanas.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
  saldoAnterior: int("saldo_anterior").notNull(),
  nuevoIngreso: int("nuevo_ingreso").notNull(),
  circulacion: int("circulacion").notNull(),
  resuelto: int("resuelto").notNull(),
  conLugar: int("con_lugar").notNull(),
  sinLugar: int("sin_lugar").notNull(),
  parcial: int("parcial").notNull(),
  caducado: int("caducado").notNull(),
  dictamen: int("dictamen").notNull(),
  requerido: int("requerido").notNull(),
  pendiente: int("pendiente").notNull(),
  historicoCirculacion: int("historico_circulacion").notNull(),
});
