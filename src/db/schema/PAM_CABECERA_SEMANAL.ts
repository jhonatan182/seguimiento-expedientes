import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { PamSemanas } from "./PAM_SEMANAS";
import { PamAnalista } from "./PAM_ANALISTA";

export const PamCabeceraSemanal = sqliteTable("PAM_CABECERA_SEMANAL", {
  id: int().primaryKey({ autoIncrement: true }),
  semanaId: int("semana_id")
    .references(() => PamSemanas.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
  analistaId: int("analista_id")
    .references(() => PamAnalista.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
  saldoAnterior: int("saldo_anterior").default(0).notNull(),
  nuevoIngreso: int("nuevo_ingreso").default(0).notNull(),
  circulacion: int("circulacion").default(0).notNull(),
  resuelto: int("resuelto").default(0).notNull(),
  conLugar: int("con_lugar").default(0).notNull(),
  sinLugar: int("sin_lugar").default(0).notNull(),
  parcial: int("parcial").default(0).notNull(),
  caducado: int("caducado").default(0).notNull(),
  dictamen: int("dictamen").default(0).notNull(),
  requerido: int("requerido").default(0).notNull(),
  pendiente: int("pendiente").default(0).notNull(),
  historicoCirculacion: int("historico_circulacion").default(0).notNull(),
});

export const PamCabeceraSemantalRelations = relations(
  PamCabeceraSemanal,
  ({ one }) => ({
    semana: one(PamSemanas, {
      fields: [PamCabeceraSemanal.semanaId],
      references: [PamSemanas.id],
    }),
    analista: one(PamAnalista, {
      fields: [PamCabeceraSemanal.analistaId],
      references: [PamAnalista.id],
    }),
  }),
);

export type PamCabeceraSemanalType = typeof PamCabeceraSemanal.$inferSelect;
export type NewPamCabeceraSemanalType = typeof PamCabeceraSemanal.$inferInsert;
