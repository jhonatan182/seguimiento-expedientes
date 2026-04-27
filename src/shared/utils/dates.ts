import { format, getDate, getMonth } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  return format(new Date(date), "PPP", { locale: es });
}

export function getWeekOfMonth(date: string): number {
  const d = new Date(date);
  
  // Día del mes (1-31)
  const dayOfMonth = getDate(d);
  
  // Día de la semana del primer día del mes (0=Dom, 1=Lun, ..., 6=Sáb)
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const firstWeekday = firstDayOfMonth.getDay(); // 0=Dom

  // Ajuste: si la semana empieza el lunes, convertir domingo (0) a 7
  const startOffset = firstWeekday === 0 ? 6 : firstWeekday - 1;

  const week = Math.ceil((dayOfMonth + startOffset) / 7);

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

export function enableNextWeekButtonByDay(): boolean {
 
  //obtener el dia de semana
  const today = new Date();
  const day = today.getDay();
  

  //retornar true si el dia es lunes o viernes
  return day === 1 || day === 5; 
}

