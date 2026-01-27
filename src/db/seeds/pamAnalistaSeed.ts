import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import bcrypt from "bcryptjs";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";

export type NuevoAnalista = InferInsertModel<typeof PamAnalista>;

export async function seedPamAnalistas() {
  const analistas: NuevoAnalista[] = [
    {
      nombre: "María González Pérez",
      usuario: "mgonzalez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Juan Carlos Martínez",
      usuario: "jcmartinez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "B",
    },
    {
      nombre: "Ana Sofía Rodríguez",
      usuario: "asrodriguez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Carlos Alberto López",
      usuario: "calopez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "C",
    },
    {
      nombre: "Laura Fernández Sánchez",
      usuario: "lfernandez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "B",
    },
    {
      nombre: "Roberto Jiménez Torres",
      usuario: "rjimenez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Patricia Ramírez Díaz",
      usuario: "pramirez",
      password: bcrypt.hashSync("password123", 10),
      modulo: "C",
    },
    {
      nombre: "Miguel Ángel Herrera",
      usuario: "maherrera",
      password: bcrypt.hashSync("password123", 10),
      modulo: "B",
    },
    {
      nombre: "Carmen Ruiz Moreno",
      usuario: "cruiz",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Diego Morales Castro",
      usuario: "dmorales",
      password: bcrypt.hashSync("password123", 10),
      modulo: "C",
    },
  ];

  try {
    await db.insert(PamAnalista).values(analistas);
    console.log(`✅ Se insertaron ${analistas.length} analistas exitosamente`);
  } catch (error) {
    console.error("❌ Error al insertar analistas:", error);
    throw error;
  }
}
