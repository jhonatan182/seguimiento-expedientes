import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { PamAnalista } from "./PAM_ANALISTA";
import { PamSemanas } from "./PAM_SEMANAS";

export const PamExpedientes = sqliteTable("PAM_EXPEDIENTES", {
  id: int().primaryKey({ autoIncrement: true }),
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
});
