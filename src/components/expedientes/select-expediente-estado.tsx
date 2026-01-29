"use client";

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { PamExpedienteType } from "@/db/schema";
import { ESTADOS } from "@/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { toggleExpedienteEstado } from "@/app/actions/expedientes-actions";
import { useSession } from "next-auth/react";

type SelectExpedienteEstadoProps = {
  row: PamExpedienteType;
};

export function SelectExpedienteEstado({ row }: SelectExpedienteEstadoProps) {
  const { data: session } = useSession();

  const estados = useMemo(() => {
    const filtrados = ESTADOS.filter((estado) =>
      estado.modulo.includes(session?.user?.modulo || "D"),
    );
    return filtrados;
  }, [session]);

  const handleValueChange = async (value: string) => {
    try {
      await toggleExpedienteEstado(row.id, value);

      toast.success("Estado actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el estado");
    }
  };

  return (
    <>
      <Label htmlFor={`${row.id}-estado`} className="sr-only">
        Estado
      </Label>
      <Select
        defaultValue={row.estado}
        onValueChange={(value) => handleValueChange(value)}
      >
        <SelectTrigger
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
          id={`${row.id}-estado`}
        >
          <SelectValue placeholder="Asignar estado" />
        </SelectTrigger>
        <SelectContent align="end">
          {estados.map((estado) => (
            <SelectItem key={estado.value} value={estado.value}>
              {estado.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
