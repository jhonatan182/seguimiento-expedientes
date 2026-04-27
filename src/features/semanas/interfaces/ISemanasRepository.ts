import { PamSemanaType } from "@/db/schema";

export interface ISemanasRepository {
  getSemanas(): Promise<PamSemanaType[]>;
  getSemanasByDescripcion(descripcion: string): Promise<PamSemanaType | undefined>;
}