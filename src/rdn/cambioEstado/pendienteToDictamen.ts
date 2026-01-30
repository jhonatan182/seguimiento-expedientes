import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";

export class PendienteToDictamen implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    return (
      cambioEstado.estadoActual === "PENDIENTE" &&
      cambioEstado.nuevoEstado === "DICTAMEN"
    );
  }

  public execute(): void {
    console.log("PendienteToDictamen");
  }
}
