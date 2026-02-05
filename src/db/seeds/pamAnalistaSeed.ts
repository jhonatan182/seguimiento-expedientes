import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import bcrypt from "bcryptjs";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";

export type NuevoAnalista = InferInsertModel<typeof PamAnalista>;

export async function seedPamAnalistas() {
  const analistas: NuevoAnalista[] = [
    {
      nombre: "JOSE LARA",
      usuario: "jlara",
      password: bcrypt.hashSync("1623198100766", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "SPS",
    },
    {
      nombre: "DAVID ZELAYA",
      usuario: "dzelaya",
      password: bcrypt.hashSync("0801198209948", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "JARRIET AMADOR",
      usuario: "jamador",
      password: bcrypt.hashSync("0801198123205", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "IRIS GONZALEZ",
      usuario: "igonzalez",
      password: bcrypt.hashSync("0801198014231", 10),
      modulo: "E",
      isJefe: "S",
      oficina: "TGU",
    },
    {
      nombre: "NANCY ACEITUNO",
      usuario: "naceituno",
      password: bcrypt.hashSync("0801198300685", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "ANA FLORES",
      usuario: "aflores",
      password: bcrypt.hashSync("0501199804729", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "SPS",
    },
    {
      nombre: "JOSUE PINEDA",
      usuario: "jpineda",
      password: bcrypt.hashSync("0321200100384", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "SPS",
    },
    {
      nombre: "KAREN MILLA",
      usuario: "kmilla",
      password: bcrypt.hashSync("1601200200464", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "SPS",
    },
    {
      nombre: "DEBORA RAMOS",
      usuario: "deramos",
      password: bcrypt.hashSync("0318199801258", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "TGU",
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
