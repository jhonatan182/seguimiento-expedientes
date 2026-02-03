"use client";

import { toast } from "sonner";

import { buildNextCabeceraSemanal } from "@/app/actions/cabecera-semanal-actions";
import { Button } from "../ui/button";

export function NextWeekButton() {
  const onClick = async () => {
    try {
      const resp = await buildNextCabeceraSemanal();

      if (!resp.success) {
        toast.error(resp.message);
        return;
      }

      toast.success(resp.message);
    } catch (error) {
      toast.error("Error al actualizar a la siguiente semana");
    }
  };

  return (
    <Button
      className="bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
      onClick={onClick}
    >
      Actualizar a la siguiente semana
    </Button>
  );
}
