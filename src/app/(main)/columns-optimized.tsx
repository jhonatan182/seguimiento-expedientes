"use client";

import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/features/shared/components/ui/button";
import { PamExpedienteType } from "@/db/schema";
import { formatDate } from "@/features/shared/utils/dates";
import { Badge } from "@/features/shared/components/ui/badge";
import { CADUCADO, CON_LUGAR, PARCIAL, SIN_LUGAR } from "@/const";

import { SelectExpedienteEstadoOptimized } from "@/features/expedientes/components/select-expediente-estado-optimized";
import { TableActionsOptimized } from "@/features/expedientes/components/table-actions-optimized";

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

export const optimizedColumns: ColumnDef<PamExpedienteType>[] = [
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

          {[CON_LUGAR, SIN_LUGAR, CADUCADO, PARCIAL].includes(
            row.original.estado,
          ) && (
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Resuelto
            </Badge>
          )}

          {row.original.isHistorico === "S" && (
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            >
              Historico
            </Badge>
          )}

          {row.original.isHistorico === "N" && (
            <Badge
              variant="secondary"
              className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
            >
              Nuevo
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
      return <SelectExpedienteEstadoOptimized row={row.original} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TableActionsOptimized row={row.original} />;
    },
  },
];
