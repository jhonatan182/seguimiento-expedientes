import {
  PendienteToAny,
  DefaultStrategy,
  AnyToResuelto,
  AnyToDictamen,
  DictamentToAny,
  DictamenToDictamen,
  DictamenToResuelto,
  RequeridoToAny,
  RequeridoToResuelto,
  RequeridoToDictamen,
} from "../cambioEstado";

export const stragiesList = [
  new DictamenToResuelto(),
  new DictamenToDictamen(),
  new RequeridoToResuelto(),
  new RequeridoToDictamen(),
  new PendienteToAny(),
  new DictamentToAny(),
  new RequeridoToAny(),
  new AnyToResuelto(),
  new AnyToDictamen(),
  // DefaultStrategy debe ir al final
  new DefaultStrategy(),
];
