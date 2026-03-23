"use client";

import { memo, useState } from "react";
import { toast } from "sonner";

import { toggleExpedienteEstado } from "@/features/expedientes/actions/expedientes-actions";
import { disableSelectEstado } from "@/features/shared/utils/validations";
import { PamExpedienteType } from "@/db/schema";
import { Label } from "@/features/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/components/ui/select";
import { DialogConfirmCustom } from "../../shared/components/ui/custom/dialog-confirm-custom";
import { useGetEstadosExpedientes } from "@/features/expedientes/hooks/use-get-estados-expedientes";
import { usePermissions } from "@/features/shared/components/security/permissions-provider";

type SelectExpedienteEstadoProps = {
  row: PamExpedienteType;
};

function SelectExpedienteEstadoComponent({ row }: SelectExpedienteEstadoProps) {
  const { isCurrentWeek } = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState(row.estado);

  const estados = useGetEstadosExpedientes();

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

  const handleOpenDialog = async (value: string) => {
    if (disableSelectEstado(value)) {
      setIsOpen(true);
      return;
    }

    await handleValueChange(value);
  };

  return (
    <div data-tour="cambiar-estado">
      <DialogConfirmCustom
        title="Confirmar cambio de estado"
        description="¿Estás seguro de que deseas cambiar el estado de este expediente?"
        onConfirm={() => {
          handleValueChange(valueSelect);
          setIsOpen(false);
        }}
        isOpen={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setValueSelect(row.estado);
        }}
      />
      <Label htmlFor={`${row.id}-estado`} className="sr-only">
        Estado
      </Label>
      <Select
        key={valueSelect + "-estado"}
        defaultValue={valueSelect}
        onValueChange={(value) => {
          setValueSelect(value);
          handleOpenDialog(value);
        }}
        disabled={!isCurrentWeek || disableSelectEstado(valueSelect)}
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
    </div>
  );
}

export const SelectExpedienteEstadoOptimized = memo(SelectExpedienteEstadoComponent);
