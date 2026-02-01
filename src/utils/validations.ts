import { ESTADOS_VALIDOS, EstadoValido } from "./mappers";

export function validateEstado(estado: string): EstadoValido {
  if (!ESTADOS_VALIDOS.includes(estado as EstadoValido)) {
    throw new Error(`Estado inválido: ${estado}`);
  }
  return estado as EstadoValido;
}
