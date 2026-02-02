import {
  PendienteToAny,
  DefaultStrategy,
  AnyToResuelto,
  AnyToDictamen,
  DictamentToAny,
  DictamenToDictamen,
  DictamenToResuelto,
} from "../cambioEstado";

export const stragiesList = [
  new DictamenToResuelto(),
  new DictamenToDictamen(),
  new PendienteToAny(),
  new DictamentToAny(),
  new AnyToResuelto(),
  new AnyToDictamen(),
  // DefaultStrategy debe ir al final
  new DefaultStrategy(),
];
