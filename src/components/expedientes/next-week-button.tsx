"use client";

import { toast } from "sonner";

import { buildNextCabeceraSemanal } from "@/app/actions/cabecera-semanal-actions";
import { ProtectedComponentByCookie } from "../security";
import { Button } from "../ui/button";
import { useState } from "react";

export function NextWeekButton() {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const resp = await buildNextCabeceraSemanal();

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
    >
      {loading ? "Actualizando..." : "Actualizar a la siguiente semana"}
    </Button>
  );
}
