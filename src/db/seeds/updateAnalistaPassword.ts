import bcrypt from "bcryptjs";

import { PamAnalista } from "../schema";
import { db } from "@/lib/drizzle";

export async function updateAnalistaPassword() {
  try {
    await db.update(PamAnalista).set({
      password: bcrypt.hashSync("Password123", 10),
    });

    console.log(`✅ Se actualizaron las contraseñas de los analistas`);
  } catch (error) {
    console.error(
      "❌ Error al actualizar las contraseñas de los analistas:",
      error,
    );
    throw error;
  }
}
