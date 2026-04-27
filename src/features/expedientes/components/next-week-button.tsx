"use client";

import { useState } from "react";
import { toast } from "sonner";

import { buildNextCabeceraSemanalAction } from "@/features/cabeceras/actions/cabecera-semanal-actions";
import { Button } from "@/shared/components/ui/button";

export function NextWeekButton() {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const resp = await buildNextCabeceraSemanalAction();

      if (!resp.success) {
        toast.error(resp.message);
        return;
      }

      toast.success(resp.message);
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar a la siguiente semana");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
      onClick={onClick}
      disabled={loading}
      data-tour="actualizar-semana"
    >
      {loading ? "Actualizando..." : "Actualizar a la siguiente semana"}
    </Button>
  );
}
