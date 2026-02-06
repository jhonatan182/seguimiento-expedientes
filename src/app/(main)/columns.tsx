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
import { CADUCADO, CON_LUGAR, PARCIAL, SIN_LUGAR } from "@/const";

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

          {[CON_LUGAR, SIN_LUGAR, CADUCADO, PARCIAL].includes(
            row.original.estado,
          )  && (
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Resuelto
            </Badge>
          )}

          {(row.original.isHistorico === "S" ) && (
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
            >
              Historico
            </Badge>
          )}

          {(row.original.isHistorico === "N" ) && (
            <Badge
              variant="secondary"
             className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
            >
              Nuevo
            </Badge>
          )}

          {/* {(row.original.isHistorico === "E" ) && (
            <Badge
              variant="secondary"
             className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            >
              Circulación
            </Badge>
          )}


               {(row.original.isHistorico === "A" ) && (
            <Badge
              variant="secondary"
             className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            >
              Saldo Anterior
            </Badge>
          )} */}

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
      if (
        row.original.isHistorico === "S" ||
        row.original.isHistorico === "E"
      ) {
        return null;
      }

      return (
        // <ProtectedComponentByCookie keyCookie="isCurrentWeek">
        <div className="flex items-center gap-2 ">
          <DialogExpediente expediente={row.original} />

          <AlertExpediente expedienteId={row.original.id} />
        </div>
        // </ProtectedComponentByCookie>
      );
    },
  },
];
