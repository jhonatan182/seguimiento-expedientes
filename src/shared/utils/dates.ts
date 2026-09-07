import {differenceInCalendarDays, getDay, addDays, subDays , format, getMonth} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

const TZ = "America/Tegucigalpa";
export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  const zonedDate = toZonedTime(new Date(date), TZ);
  return format(zonedDate, "PPP", { locale: es });
}

export function getWeekOfMonth(date: string): number {
  const d = toZonedTime(date, TZ);
  const year = d.getFullYear();
  const month = d.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = getDay(firstDayOfMonth); // 0=Dom, 1=Lun, ..., 6=Sáb

  let mondayOfWeek1: Date;

  if (firstWeekday === 0) {
    // El mes inicia domingo -> la semana 1 empieza el lunes siguiente
    mondayOfWeek1 = addDays(firstDayOfMonth, 1);
  } else if (firstWeekday === 6) {
    // El mes inicia sábado -> la semana 1 empieza el lunes siguiente
    mondayOfWeek1 = addDays(firstDayOfMonth, 2);
  } else {
    // El mes inicia martes a viernes -> retrocedemos al lunes de esa
    // misma semana (puede caer en el mes anterior), porque esos días
    // (mar-vie) SÍ son parte de la semana laboral 1
    mondayOfWeek1 = subDays(firstDayOfMonth, firstWeekday - 1);
  }

  const diffDays = differenceInCalendarDays(d, mondayOfWeek1);
  const week = Math.floor(diffDays / 7) + 1;

  return week;
}

// Debe de retornar el mes actual semana, mes y año : Ejemplo: Semana 1.1 - Enero 2026 (primer 1 es el mes, segundo 1 es la semana)
export function buildWeek(): string {
  const today = toZonedTime(new Date(), TZ);
  const week = getWeekOfMonth(today.toISOString());
  const month = getMonth(today) + 1;
  const year = today.getFullYear();
  const monthDescription =
    format(today, "MMMM", { locale: es }).charAt(0).toUpperCase() +
    format(today, "MMMM", { locale: es }).slice(1);


  console.log({ week, month, year, monthDescription });

  return `Semana ${month}.${week} - ${monthDescription} ${year}`;
}

export function getCurrentMonthCapitalized(): string {
  const today = toZonedTime(new Date(), TZ);
  return (
    format(today, "MMMM", { locale: es }).charAt(0).toUpperCase() +
    format(today, "MMMM", { locale: es }).slice(1)
  );
}

export function enableNextWeekButtonByDay(): boolean {
  //obtener el dia de semana
  const today = toZonedTime(new Date(), TZ);
  const day = today.getDay();

  //retornar true si el dia es lunes o viernes
  return day === 1 || day === 3 || day === 5;
}
