import { PamSemanaType } from "@/db/schema";
import { ISemanasRepository } from "../interfaces/ISemanasRepository";
import { db } from "@/lib/drizzle";
import { VIGENTE } from "@/const";

class SemanasRepository implements ISemanasRepository {
  async getSemanas(): Promise<PamSemanaType[]> {
    const semanas = await db.query.PamSemanas.findMany({
      where: (semanas, { eq }) => eq(semanas.vigente, VIGENTE),
    });
    return semanas;
  }
  async getSemanasByDescripcion(
    descripcion: string,
  ): Promise<PamSemanaType | undefined> {
    const semana = await db.query.PamSemanas.findFirst({
      where: (semanas, { eq }) => eq(semanas.descripcion, descripcion),
    });
    return semana;
  }
}

export const semanasRepository = new SemanasRepository();
