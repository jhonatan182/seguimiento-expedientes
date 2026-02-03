import {
  CADUCADO,
  CON_LUGAR,
  DICTAMEN,
  DICTAMEN_CIRCULACION,
  DICTAMEN_CUSTODIA,
  PARCIAL,
  SIN_LUGAR,
} from "@/const";
import { ESTADOS_VALIDOS, EstadoValido } from "./mappers";

export function validateEstado(estado: string): EstadoValido {
  if (!ESTADOS_VALIDOS.includes(estado as EstadoValido)) {
    throw new Error(`Estado inválido: ${estado}`);
  }
  return estado as EstadoValido;
}

export function disableSelectEstado(estado: string): boolean {
  return (
    estado === "CON_LUGAR" ||
    estado === "SIN_LUGAR" ||
    estado === "PARCIAL" ||
    estado === "CADUCADO"
  );
}

export function incrementarEstadoResuelto(estado: string): boolean {
  const estadosResueltos = [CON_LUGAR, SIN_LUGAR, PARCIAL, CADUCADO];

  return estadosResueltos.includes(estado) ? true : false;
}

export function incrementarEstadoDictamen(estado: string): boolean {
  const estadosDictamen = [DICTAMEN_CIRCULACION, DICTAMEN_CUSTODIA, DICTAMEN];

  return estadosDictamen.includes(estado) ? true : false;
}
