"use client";

import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { PamExpedienteType } from "@/db/schema";

import {
  DialogExpediente,
  AlertExpediente,
  SelectExpedienteEstado,
} from "@/components/expedientes";
import { formatDate } from "@/utils/dates";
import { ProtectedComponentByCookie } from "@/components/security";
import { disableSelectEstado } from "@/utils/validations";
import { Badge } from "@/components/ui/badge";

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

export const columns: ColumnDef<PamExpedienteType>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "expediente",
    header: "Expediente",

    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.original.expediente}
          {row.original.isHistorico === "S" && (
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            >
              Historico
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "fechaIngreso",
    header: "Fecha Ingreso",
    cell: ({ row }) => {
      console.log(row.original);

      return formatDate(row.original.fechaIngreso);
    },
  },
  {
    accessorKey: "fechaUltimaModificacion",
    header: "Fecha Movimiento",
    cell: ({ row }) => {
      return formatDate(row.original.fechaUltimaModificacion);
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      return <SelectExpedienteEstado row={row.original} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      if (disableSelectEstado(row.original.estado)) {
        return null;
      }

      return (
        <ProtectedComponentByCookie keyCookie="isCurrentWeek">
          <div className="flex items-center gap-2 ">
            <DialogExpediente expediente={row.original} />

            <AlertExpediente expedienteId={row.original.id} />
          </div>
        </ProtectedComponentByCookie>
      );
    },
  },
];
