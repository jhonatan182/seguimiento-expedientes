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
