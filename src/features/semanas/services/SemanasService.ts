import { ISemanasRepository } from "../interfaces/ISemanasRepository";
import { semanasRepository } from "./SemanasRepository";

class SemanasService {
  constructor(private readonly semanasRespository: ISemanasRepository) {}

  async getSemanas() {
    const semanas = await this.semanasRespository.getSemanas();
    return semanas || [];
  }

  async getSemanasByDescripcion(descripcion: string) {
    const semana =
      await this.semanasRespository.getSemanasByDescripcion(descripcion);
    return semana;
  }
}

export const semanasService = new SemanasService(semanasRepository);
