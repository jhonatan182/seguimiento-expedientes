import { format, getDate, getMonth } from "date-fns";
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

  // Día del mes (1-31)
  const dayOfMonth = getDate(d);

  // Día de la semana del primer día del mes (0=Dom, 1=Lun, ..., 6=Sáb)
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstWeekday = firstDayOfMonth.getDay(); // 0=Dom

    // Calcular en qué día cae el primer LUNES del mes
  // Si el mes empieza en lunes, daysUntilMonday = 0
  const daysUntilMonday = (1 - firstWeekday + 7) % 7;
  const firstMondayDate = 1 + daysUntilMonday;


  // Si el día consultado cae ANTES del primer lunes (ej. sáb/dom iniciales),
  // lo tratamos como parte de la semana 1 (no debería pasar en la práctica
  // porque esos días no son laborables, pero evita valores negativos/0)
  if (dayOfMonth < firstMondayDate) {
    return 1;
  }

  const week = Math.floor((dayOfMonth - firstMondayDate) / 7) + 1;

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
