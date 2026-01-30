import { ICambioEstado, IEstatadosEstrategy } from "@/interfaces";

export class PendienteToRequerido implements IEstatadosEstrategy {
  public satisfy(cambioEstado: ICambioEstado): boolean {
    return (
      cambioEstado.estadoActual === "PENDIENTE" &&
      cambioEstado.nuevoEstado === "REQUERIDO"
    );
  }

  public execute(): void {
    console.log("PendienteToRequerido");
  }
}
