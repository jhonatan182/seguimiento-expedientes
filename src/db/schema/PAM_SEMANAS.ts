import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PamSemanas = sqliteTable("PAM_SEMANAS", {
  id: int().primaryKey({ autoIncrement: true }),
  descripcion: text().notNull(),
});
