import {
  defaultEstados,
  estadosDispensas,
  estadosExoneraciones,
  estadosRegistro,
  MODULO_DISPENSA,
  MODULO_EXONERACION,
  MODULO_REGISTRO,
  OFICINA_SPS,
  OFICINA_TGU,
} from "@/const";
import { ISelectOption } from "@/interfaces";

export function buildSelectOptionsByModuleAndOffice(
  modulo: string,
  oficina: string,
): ISelectOption[] {
  if (!modulo || !oficina) {
    return [];
  }

  if (modulo === MODULO_REGISTRO) {
    return [...estadosRegistro];
  }

  //retornar opciones por defecto + especificas para exoneracion en TGU
  if (modulo === MODULO_EXONERACION && oficina === OFICINA_TGU) {
    return [...defaultEstados, ...estadosExoneraciones];
  }

  //retornar opciones por defecto + especificas para dispensa en TGU
  if (modulo === MODULO_DISPENSA && oficina === OFICINA_TGU) {
    return [...defaultEstados, ...estadosDispensas];
  }

  //retornar opciones por defecto + especificas para dispensas en SPS
  if (
    (modulo === MODULO_EXONERACION || modulo === MODULO_DISPENSA) &&
    oficina === OFICINA_SPS
  ) {
    return [...defaultEstados, ...estadosDispensas];
  }

  return [...defaultEstados];
}
