import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

import { PamCabeceraSemanal } from "./PAM_CABECERA_SEMANAL";
import { PamExpedientes } from "./PAM_EXPEDIENTES";

export const PamSemanas = sqliteTable("PAM_SEMANAS", {
  id: int().primaryKey({ autoIncrement: true }),
  descripcion: text().notNull(),
});

export const PamSemanasRelations = relations(PamSemanas, ({ many }) => ({
  expedientes: many(PamExpedientes),
  cabeceras: many(PamCabeceraSemanal),
}));

export type PamSemanaType = typeof PamSemanas.$inferSelect;
export type NewPamSemanaType = typeof PamSemanas.$inferInsert;
