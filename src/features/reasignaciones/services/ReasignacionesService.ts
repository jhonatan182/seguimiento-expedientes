import { getSessionUserWithCookies } from "@/features/auth/actions/auth-actions";
import {
  reasignacionesRepository,
} from "./ReasignacionesRepository";
import { IReasignacionesRepository } from "../interfaces/IReasignacionesRepository";

class ReasignacionesService {
  constructor(private readonly repository: IReasignacionesRepository) {}

  async getReasignaciones() {
    const { user } = await getSessionUserWithCookies();

    // console.log("user", user);

    return this.repository.getReasignaciones(user.modulo, user.oficina);
  }
}

export const reasignacionesService = new ReasignacionesService(
  reasignacionesRepository,
);
