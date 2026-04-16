"use client";

import { memo, useState } from "react";
import { toast } from "sonner";

import { DialogConfirmCustom } from "../../../shared/components/ui/custom/dialog-confirm-custom";
import { toggleExpedienteEstado } from "@/features/expedientes/actions/expedientes-actions";
import { disableSelectEstado } from "@/shared/utils/validations";
import { Label } from "@/shared/components/ui/label";
import { PamExpedienteType } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type SelectExpedienteEstadoProps = {
  row: PamExpedienteType;
};

function SelectExpedienteEstadoComponent({ row }: SelectExpedienteEstadoProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [valueSelect, setValueSelect] = useState(row.estado);

  // Actualizar estado local si el estado de la fila cambia externamente
  if (valueSelect !== row.estado && !isOpen) {
    setValueSelect(row.estado);
  }

  const handleValueChange = async (value: string) => {
    try {
      const response = await toggleExpedienteEstado(row.id, value);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
    } catch {
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
        disabled={!row.isCurrentWeek || disableSelectEstado(valueSelect)}
      >
        <SelectTrigger
          className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
          size="sm"
          id={`${row.id}-estado`}
        >
          <SelectValue placeholder="Asignar estado" />
        </SelectTrigger>
        <SelectContent position="popper">
          {row.estados?.map((estado) => (
            <SelectItem key={estado.value} value={estado.value}>
              {estado.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export const SelectExpedienteEstadoOptimized = memo(
  SelectExpedienteEstadoComponent,
);
