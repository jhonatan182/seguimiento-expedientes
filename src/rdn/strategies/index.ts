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
  PendienteToRequerido,
  PendienteToDictamen,
  PendienteToResuelto,
  RequeridoToPendiente,
  DictamenToPendiente,
  DictamenToRequerido,
} from "../cambioEstado";

export const stragiesList = [
  //reestructuraciones
  new PendienteToRequerido(),
  new PendienteToDictamen(),
  new PendienteToResuelto(),

  new RequeridoToPendiente(),
  new RequeridoToResuelto(),
  new RequeridoToDictamen(),

  new DictamenToPendiente(),
  new DictamenToRequerido(),
  new DictamenToResuelto(),
  new DictamenToDictamen(),

  // //anteriores
  // new PendienteToAny(),
  // new DictamentToAny(),
  // new RequeridoToAny(),
  // new AnyToResuelto(),
  // new AnyToDictamen(),
  // // DefaultStrategy debe ir al final
  // new DefaultStrategy(),
];
