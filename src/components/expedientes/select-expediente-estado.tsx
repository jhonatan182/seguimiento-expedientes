"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { toggleExpedienteEstado } from "@/app/actions/expedientes-actions";
import { disableSelectEstado } from "@/utils/validations";
import { getCookie } from "@/app/actions/cookies-actions";
import { PamExpedienteType } from "@/db/schema";
import { Label } from "@/components/ui/label";
import { ESTADOS } from "@/const";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectExpedienteEstadoProps = {
  row: PamExpedienteType;
};

export function SelectExpedienteEstado({ row }: SelectExpedienteEstadoProps) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [isCurrentWeek, setIsCurrentWeek] = useState(false);

  const estados = ESTADOS.filter((estado) =>
    estado.modulo.includes(session?.user?.modulo || "D"),
  );

  const handleValueChange = async (value: string) => {
    try {
      const response = await toggleExpedienteEstado(row.id, value);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    } catch (error) {
      toast.error("Error al actualizar el estado");
    }
  };

  useEffect(() => {
    const handleCookie = async () => {
      const cookie = await getCookie("isCurrentWeek");
      setIsCurrentWeek(cookie === "true");
    };

    handleCookie();
  }, [searchParams]);

  return (
    <>
      <Label htmlFor={`${row.id}-estado`} className="sr-only">
        Estado
      </Label>
      <Select
        key={row.estado + "-estado"}
        defaultValue={row.estado}
        onValueChange={(value) => handleValueChange(value)}
        disabled={!isCurrentWeek || disableSelectEstado(row.estado)}
      >
        <SelectTrigger
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
          id={`${row.id}-estado`}
        >
          <SelectValue placeholder="Asignar estado" />
        </SelectTrigger>
        <SelectContent position="popper">
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
