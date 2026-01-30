import { ICambioEstado } from "./ICambioEstado";

export interface IEstatadosEstrategy {
  satisfy(cambioEstado: ICambioEstado): boolean;
  execute(): void;
}
