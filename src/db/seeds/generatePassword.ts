import bcrypt from "bcryptjs";

export async function generatePassword() {
  try {
    
    const password = bcrypt.hashSync("0816197700094", 10);
    console.log(password);
    console.log(`✅ Contraseña generada`);
  } catch (error) {
    console.error(
      "❌ Error al generar la contraseña:",
      error,
    );
    throw error;
  }
}

generatePassword();