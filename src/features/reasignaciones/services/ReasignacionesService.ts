import { getSessionUserWithCookies } from "@/features/auth/actions/auth-actions";
import {
  reasignacionesRepository,
} from "./ReasignacionesRepository";
import { IReasignacionesRepository } from "../interfaces/IReasignacionesRepository";

class ReasignacionesService {
  constructor(private readonly repository: IReasignacionesRepository) {}

  async getReasignaciones() {
    const { user } = await getSessionUserWithCookies();

    return this.repository.getReasignaciones(user.modulo, user.oficina);
  }

  async reasignarExpediente(expedienteId: number, nuevoAnalistaId: number) {
    return await this.repository.reasignar(expedienteId, nuevoAnalistaId);
  }
}

export const reasignacionesService = new ReasignacionesService(
  reasignacionesRepository,
);
