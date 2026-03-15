import { format, getDate, getMonth } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  return format(new Date(date), "PPP", { locale: es });
}
export function getWeekOfMonth(date: string): number {
  const d = getDate(new Date(date));
  const week = Math.ceil(d / 7);
  return week;
}

// Debe de retornar el mes actual semana, mes y año : Ejemplo: Semana 1.1 - Enero 2026 (primer 1 es el mes, segundo 1 es la semana)
export function buildWeek(): string {
  const today = new Date();
  const week = getWeekOfMonth(today.toISOString());
  const month = getMonth(today) + 1;
  const year = today.getFullYear();
  const monthDescription =
    format(today, "MMMM", { locale: es }).charAt(0).toUpperCase() +
    format(today, "MMMM", { locale: es }).slice(1);
  return `Semana ${month}.${week} - ${monthDescription} ${year}`;
}

export function getCurrentMonthCapitalized(): string {
  const today = new Date();
  return (
    format(today, "MMMM", { locale: es }).charAt(0).toUpperCase() +
    format(today, "MMMM", { locale: es }).slice(1)
  );
}
