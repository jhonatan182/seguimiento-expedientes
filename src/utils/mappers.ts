import { PamCabeceraSemanalType } from "@/db/schema/PAM_CABECERA_SEMANAL";

export const ESTADOS_VALIDOS = [
  "CON_LUGAR",
  "SIN_LUGAR",
  "PARCIAL",
  "CADUCADO",
  "DICTAMEN",
  "DICTAMEN_CIRCULACION",
  "DICTAMEN_CUSTODIA",
  "REQUERIDO",
  "PENDIENTE",
] as const;

export type EstadoValido = (typeof ESTADOS_VALIDOS)[number];

export const mapColumnDb: Record<EstadoValido, keyof PamCabeceraSemanalType> = {
  CON_LUGAR: "conLugar",
  SIN_LUGAR: "sinLugar",
  PARCIAL: "parcial",
  CADUCADO: "caducado",
  DICTAMEN: "dictamen",
  DICTAMEN_CIRCULACION: "circulacion",
  DICTAMEN_CUSTODIA: "circulacion",
  REQUERIDO: "requerido",
  PENDIENTE: "pendiente",
};
