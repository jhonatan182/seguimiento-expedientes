import {
  PendienteToAny,
  DefaultStrategy,
  AnyToResuelto,
  AnyToDictamen,
  DictamentToAny,
  DictamenToDictamen,
} from "../cambioEstado";

export const stragiesList = [
  new DictamenToDictamen(),
  new PendienteToAny(),
  new DictamentToAny(),
  new AnyToResuelto(),
  new AnyToDictamen(),
  // DefaultStrategy debe ir al final
  new DefaultStrategy(),
];
