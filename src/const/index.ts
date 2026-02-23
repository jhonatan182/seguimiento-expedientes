import { ISelectOption } from "@/interfaces";

//ESTADOS
export const CADUCADO = "CADUCADO";
export const CON_LUGAR = "CON_LUGAR";
export const DICTAMEN = "DICTAMEN";
export const DICTAMEN_CIRCULACION = "DICTAMEN_CIRCULACION";
export const DICTAMEN_CUSTODIA = "DICTAMEN_CUSTODIA";
export const PARCIAL = "PARCIAL";
export const PENDIENTE = "PENDIENTE";
export const REQUERIDO = "REQUERIDO";
export const SIN_LUGAR = "SIN_LUGAR";

//MODULOS
export const MODULO_EXONERACION = "E";
export const MODULO_DISPENSA = "D";

//OFICINAS
export const OFICINA_TGU = "TGU";
export const OFICINA_SPS = "SPS";

export const defaultEstados: ISelectOption[] = [
  {
    value: CADUCADO,
    label: "Caducado",
  },
  {
    value: CON_LUGAR,
    label: "Con Lugar",
  },
  {
    value: PARCIAL,
    label: "Parcial",
  },

  {
    value: PENDIENTE,
    label: "Pendiente",
  },

  {
    value: REQUERIDO,
    label: "Requerido",
  },
  {
    value: SIN_LUGAR,
    label: "Sin Lugar",
  },
];

export const estadosExoneraciones: ISelectOption[] = [
  {
    value: DICTAMEN_CIRCULACION,
    label: "Dictamen Circulación",
  },
  {
    value: DICTAMEN_CUSTODIA,
    label: "Dictamen Custodia",
  },
];

export const estadosDispensas: ISelectOption[] = [
  {
    value: DICTAMEN,
    label: "Dictamen",
  },
];

export const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
