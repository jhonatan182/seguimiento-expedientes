import { InferInsertModel } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import bcrypt from "bcryptjs";

import { PamAnalista } from "@/db/schema/PAM_ANALISTA";

export type NuevoAnalista = InferInsertModel<typeof PamAnalista>;

export async function seedPamAnalistas() {
  const analistas: NuevoAnalista[] = [
  {
    "id": 1,
    "nombre": "DAVID ZELAYA",
    "usuario": "dzelaya",
    "password": "$2b$10$gFsJzBvDn/9GVKYal6xnXOMgf6jKG/sLuQZR282KXHAozdylmq2VS",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 2,
    "nombre": "JARRIET AMADOR",
    "usuario": "jamador",
    "password": "$2b$10$S5YBDyc1keZ4nCwsI1KvTO.726kQ4iDPtf89BhD4GU6tlNVYBUM0O",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 3,
    "nombre": "IRIS GONZALEZ",
    "usuario": "igonzalez",
    "password": "$2b$10$.Et2cvD5Re28hO/wvFNHaOYNRD08nr76xXhWYGgsieCByGH841sO2",
    "modulo": "E",
    "isJefe": "S",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 4,
    "nombre": "NANCY ACEITUNO",
    "usuario": "naceituno",
    "password": "$2b$10$VOKbnP1nGmI7BfTp1x31xezAbIOYaxk4teQplsLUhWA3rb1KG3E6q",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 5,
    "nombre": "DEBORA RAMOS",
    "usuario": "deramos",
    "password": "$2b$10$3CwQ.7FbZkeRV4aIOsI3I.1IhQIDAZJISPlYV58407oJvzDZOwTCu",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "N"
  },
  {
    "id": 6,
    "nombre": "SUAM LI",
    "usuario": "sclopez",
    "password": "$2b$10$qOEh60mC9.GfMSFFwlkIS.IRVFkf71zdpEZf5gBS6gcH.DZuWGdqC",
    "modulo": "D",
    "isJefe": "S",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 7,
    "nombre": "LILI BADOS",
    "usuario": "lbados",
    "password": "$2b$10$v5BG4alpSvnMq.DgOOpjY.czhB63Znvi94R/ZONa5gJUyJwGY77PS",
    "modulo": "D",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 8,
    "nombre": "MARIAM GOMEZ",
    "usuario": "mgomez",
    "password": "$2b$10$JfaZVfQZ4507xj7JBJuJnOM5fBLTTMyWSbndHiSOAnqKnlVDtS7sy",
    "modulo": "D",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 9,
    "nombre": "MANUEL ORTEGA",
    "usuario": "mortega",
    "password": "$2b$10$ZKUUI0ABy47zNPXsj7EraetDhGvBVvPEiwnNBu4xxuJM/25moPFvW",
    "modulo": "D",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 10,
    "nombre": "EVA VALERIANO",
    "usuario": "evaleriano",
    "password": "$2b$10$frx9B1.Mo6..nqtkUJJukOOLkvv/MX0Qw25f1JsyPCR4x0zl28BMq",
    "modulo": "D",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  },
  {
    "id": 11,
    "nombre": "JOSE LARA",
    "usuario": "jlara",
    "password": "$2b$10$P0ueMC7bDxN9Vt8kq4DkVeVjLuxPe7pwUbaaobed/TA5O1zGiQYZS",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 12,
    "nombre": "ANA FLORES",
    "usuario": "aflores",
    "password": "$2b$10$o7zJDJOIpmYiNeWTOSmIveNSmCI5.SkLVqYheP6ip00ZFks2XAEYe",
    "modulo": "E",
    "isJefe": "S",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 13,
    "nombre": "JOSUE PINEDA",
    "usuario": "jpineda",
    "password": "$2b$10$BmCIhY3ApUzjMfLSsmOz2.GtwmDoUJjnA7mcyiy.0cdOZ01vy77q.",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 14,
    "nombre": "KAREN MILLA",
    "usuario": "kmilla",
    "password": "$2b$10$Mm/WWENNS1nOp0WTx37yTublIQJQTV99IDWjhhni35/1ps96RQt7e",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 15,
    "nombre": "SARA PADILLA",
    "usuario": "spadilla",
    "password": "$2b$10$910x4TTr2V1oicxKZrp0c.bMyFlGZlQ7zw.R6kk9jpG/uyhO8Ch4m",
    "modulo": "D",
    "isJefe": "S",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 16,
    "nombre": "ANA LEIVA",
    "usuario": "aleiva",
    "password": "$2b$10$3uEMSxT//r56GiSUXgA7CubsUMASqp0veJ3qrNJu2T7dOPPMDXvMW",
    "modulo": "D",
    "isJefe": "N",
    "oficina": "SPS",
    "isActivo": "S"
  },
  {
    "id": 17,
    "nombre": "ANYI MARTINEZ",
    "usuario": "anmartinez",
    "password": "$2b$10$gNi7Ek22oYqKkKz4PAFjKu/d4XnB8zoRfwYwosC4wFBeVOM37lGcq",
    "modulo": "E",
    "isJefe": "N",
    "oficina": "TGU",
    "isActivo": "S"
  }
]


  try {
    await db.insert(PamAnalista).values(analistas);
    console.log(`✅ Se insertaron ${analistas.length} analistas exitosamente`);
  } catch (error) {
    console.error("❌ Error al insertar analistas:", error);
    throw error;
  }
}
