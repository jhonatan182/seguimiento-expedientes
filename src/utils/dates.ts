import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(date: string): string {
  if (!date) {
    return "";
  }

  return format(new Date(date), "PPP", { locale: es });
}
