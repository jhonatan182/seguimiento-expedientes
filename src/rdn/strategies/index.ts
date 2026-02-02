import {
  PendienteToAny,
  DefaultStrategy,
  AnyToResuelto,
} from "../cambioEstado";

export const stragiesList = [
  new AnyToResuelto(),
  new PendienteToAny(),
  new DefaultStrategy(),
];
