export const CADUCADO = "CADUCADO";
export const CON_LUGAR = "CON_LUGAR";
export const DICTAMEN = "DICTAMEN";
export const DICTAMEN_CIRCULACION = "DICTAMEN_CIRCULACION";
export const DICTAMEN_CUSTODIA = "DICTAMEN_CUSTODIA";
export const PARCIAL = "PARCIAL";
export const PENDIENTE = "PENDIENTE";
export const REQUERIDO = "REQUERIDO";
export const SIN_LUGAR = "SIN_LUGAR";

export const ESTADOS = [
  { value: CADUCADO, label: "Caducado", modulo: ["E", "D"] },
  { value: CON_LUGAR, label: "Con Lugar", modulo: ["E", "D"] },
  { value: DICTAMEN, label: "Dictamen", modulo: ["D"] },
  {
    value: DICTAMEN_CIRCULACION,
    label: "Dictamen Circulación",
    modulo: ["E"],
  },
  {
    value: DICTAMEN_CUSTODIA,
    label: "Dictamen Custodia",
    modulo: ["E"],
  },
  { value: PARCIAL, label: "Parcial", modulo: ["E", "D"] },
  { value: PENDIENTE, label: "Pendiente", modulo: ["E", "D"] },
  { value: REQUERIDO, label: "Requerido", modulo: ["E", "D"] },
  { value: SIN_LUGAR, label: "Sin Lugar", modulo: ["E", "D"] },
];
