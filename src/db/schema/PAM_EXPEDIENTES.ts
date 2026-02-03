import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { PamAnalista } from "./PAM_ANALISTA";
import { PamSemanas } from "./PAM_SEMANAS";

export const PamExpedientes = sqliteTable("PAM_EXPEDIENTES", {
  id: int().primaryKey({ autoIncrement: true }),
  expediente: text("expediente").notNull(),
  analistaId: int("analista_id")
    .references(() => PamAnalista.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
  semanaId: int("semana_id")
    .references(() => PamSemanas.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    })
    .notNull(),
  fechaIngreso: text("fecha_ingreso").notNull(),
  estado: text("estado").notNull(),
  fechaUltimaModificacion: text("fecha_ultima_modificacion").notNull(),
  observaciones: text("observaciones"),
  isHistorico: text("is_historico", { length: 1 }).default("N").notNull(),
});

export const PamExpedientesRelations = relations(PamExpedientes, ({ one }) => ({
  semana: one(PamSemanas, {
    fields: [PamExpedientes.semanaId],
    references: [PamSemanas.id],
  }),
  analista: one(PamAnalista, {
    fields: [PamExpedientes.analistaId],
    references: [PamAnalista.id],
  }),
}));

export type PamExpedienteType = typeof PamExpedientes.$inferSelect;
export type NewPamExpedienteType = typeof PamExpedientes.$inferInsert;
