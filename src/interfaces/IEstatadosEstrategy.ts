import { ICambioEstado } from "./ICambioEstado";
import { IExecuteData } from "./IExecuteData";

export interface IEstatadosEstrategy {
  satisfy(cambioEstado: ICambioEstado): boolean;
  execute(data: IExecuteData): Promise<void>;
}
