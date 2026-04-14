"use client";

import { IconGripVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/shared/components/ui/button";

import { PamExpedienteType } from "@/db/schema";

import {
  DialogExpediente,
  AlertExpediente,
  SelectExpedienteEstado,
} from "@/features/expedientes/components";
import { formatDate } from "@/shared/utils/dates";
import { IReasignacionExpediente } from "@/features/reasignaciones/interfaces/IReasignacionExpediente";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export const columns: ColumnDef<IReasignacionExpediente>[] = [
  {
    id: "drag",
    header: () => null,
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground size-7 hover:bg-transparent"
      >
        <IconGripVertical className="text-muted-foreground size-3" />
        <span className="sr-only">Drag to reorder</span>
      </Button>
    ),
  },
  {
    accessorKey: "expediente",
    header: "Expediente",

    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">{row.original.expediente}</div>
      );
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "analistaActual.nombre",
    header: "Analista Actual",
  },
  {
    id: "reasignarA",
    header: "Reasignar a",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Seleccionar analista" />
            </SelectTrigger>
            <SelectContent position="popper">
              {row.original.analistasDisponibles.map((analista) => (
                <SelectItem
                  className="cursor-pointer"
                  key={analista.id}
                  value={analista.id.toString()}
                >
                  {analista.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       if (
  //         row.original.isHistorico === "S" ||
  //         row.original.isHistorico === "E"
  //       ) {
  //         return null;
  //       }

  //       const disabled = disableSelectEstado(row.original.estado);

  //       if (disabled) {
  //         return null;
  //       }

  //       return (
  //         <ProtectedComponentByCookie keyCookie="isCurrentWeek">
  //           <div className="flex items-center gap-2 ">
  //             <DialogExpediente expediente={row.original} />

  //             <AlertExpediente expedienteId={row.original.id} />
  //           </div>
  //         </ProtectedComponentByCookie>
  //       );
  //     },
  //   },
];
