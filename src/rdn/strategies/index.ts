import {
  DictamenToDictamen,
  DictamenToResuelto,
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
];
