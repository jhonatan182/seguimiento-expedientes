import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const PamAnalista = sqliteTable("PAM_ANALISTA", {
  id: int().primaryKey({ autoIncrement: true }),
  nombre: text().notNull(),
  usuario: text().notNull().unique(),
  password: text().notNull(),
  modulo: text({ length: 1 }).notNull(),
  isJefe: text({ length: 1 }).notNull(),
});
