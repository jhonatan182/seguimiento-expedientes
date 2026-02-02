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
  CADUCADO: "caducado",
  CON_LUGAR: "conLugar",
  DICTAMEN: "dictamen",
  DICTAMEN_CIRCULACION: "dictamenCirculacion",
  DICTAMEN_CUSTODIA: "dictamenCustodia",
  PARCIAL: "parcial",
  PENDIENTE: "pendiente",
  REQUERIDO: "requerido",
  SIN_LUGAR: "sinLugar",
};
