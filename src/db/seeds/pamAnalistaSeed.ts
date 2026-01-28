import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import bcrypt from "bcryptjs";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";

export type NuevoAnalista = InferInsertModel<typeof PamAnalista>;

export async function seedPamAnalistas() {
  const analistas: NuevoAnalista[] = [
    {
      nombre: "Kelvin Avila",
      usuario: "kavila",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Jhonatan Vargas",
      usuario: "jvargas",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "David Zelaya",
      usuario: "dzelaya",
      password: bcrypt.hashSync("password123", 10),
      modulo: "B",
    },
    {
      nombre: "Nancy Aceituno",
      usuario: "naceituno",
      password: bcrypt.hashSync("password123", 10),
      modulo: "A",
    },
    {
      nombre: "Rosy Nolasco",
      usuario: "rnolasco",
      password: bcrypt.hashSync("password123", 10),
      modulo: "C",
    },
    {
      nombre: "Masiel Gonzales",
      usuario: "mgonzales",
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
