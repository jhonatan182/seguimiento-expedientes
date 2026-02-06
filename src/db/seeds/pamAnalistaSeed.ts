import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import bcrypt from "bcryptjs";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";

export type NuevoAnalista = InferInsertModel<typeof PamAnalista>;

export async function seedPamAnalistas() {
  const analistas: NuevoAnalista[] = [
    //EXONERACIONES - TGU
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
      nombre: "DEBORA RAMOS",
      usuario: "deramos",
      password: bcrypt.hashSync("0318199801258", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "TGU",
    },

    // DISPENSAS - TGU
    {
      nombre: "SUAM LI",
      usuario: "sclopez",
      password: bcrypt.hashSync("0801199720689", 10),
      modulo: "D",
      isJefe: "S",
      oficina: "TGU",
    },
    {
      nombre: "LILI BADOS",
      usuario: "lbados",
      password: bcrypt.hashSync("0801198126295", 10),
      modulo: "D",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "MARIAM GOMEZ",
      usuario: "mgomez",
      password: bcrypt.hashSync("0801199418846", 10),
      modulo: "D",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "MANUEL ORTEGA",
      usuario: "mortega",
      password: bcrypt.hashSync("0506197300394", 10),
      modulo: "D",
      isJefe: "N",
      oficina: "TGU",
    },
    {
      nombre: "EVA VALERIANO",
      usuario: "evaleriano",
      password: bcrypt.hashSync("0801200211583", 10),
      modulo: "D",
      isJefe: "N",
      oficina: "TGU",
    },

    // EXONERACIONES - SPS
    {
      nombre: "JOSE LARA",
      usuario: "jlara",
      password: bcrypt.hashSync("1623198100766", 10),
      modulo: "E",
      isJefe: "N",
      oficina: "SPS",
    },

    {
      nombre: "ANA FLORES",
      usuario: "aflores",
      password: bcrypt.hashSync("0501199804729", 10),
      modulo: "E",
      isJefe: "S",
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

    // DISPENSAS - SPS
    {
      nombre: "SARA PADILLA",
      usuario: "spadilla",
      password: bcrypt.hashSync("1809198100099", 10),
      modulo: "D",
      isJefe: "S",
      oficina: "SPS",
    },
    {
      nombre: "ANA LEIVA",
      usuario: "aleiva",
      password: bcrypt.hashSync("1801199902477", 10),
      modulo: "D",
      isJefe: "N",
      oficina: "SPS",
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
