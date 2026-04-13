export interface IReasignacionExpediente {
  id: number;
  expediente: string;
  analistaActual: {
    id: number;
    nombre: string;
    usuario: string;
    modulo: string;
    oficina: string;
  };
  analistasDisponibles: Array<{
    id: number;
    nombre: string;
    usuario: string;
  }>;
}