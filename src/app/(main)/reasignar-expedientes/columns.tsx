"use client";

import { useSortable } from "@dnd-kit/sortable";
import { IconGripVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/features/shared/components/ui/button";

import { PamExpedienteType } from "@/db/schema";

import {
  DialogExpediente,
  AlertExpediente,
  SelectExpedienteEstado,
} from "@/features/expedientes/components";
import { formatDate } from "@/features/shared/utils/dates";
import { ProtectedComponentByCookie } from "@/features/shared/components/security";
import { disableSelectEstado } from "@/features/shared/utils/validations";
import { Badge } from "@/features/shared/components/ui/badge";
import { CADUCADO, CON_LUGAR, PARCIAL, SIN_LUGAR } from "@/const";
import { IReasignacionExpediente } from "@/features/reasignaciones/interfaces/IReasignacionExpediente";

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

export const columns: ColumnDef<IReasignacionExpediente>[] = [
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
        <div className="flex items-center gap-2">{row.original.expediente}</div>
      );
    },
  },
  {
    accessorKey: "analistaActual.nombre",
    header: "Analista Actual",

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
