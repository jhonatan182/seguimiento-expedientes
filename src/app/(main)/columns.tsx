"use client";

import { useSortable } from "@dnd-kit/sortable";
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Semana } from "@/responses";
import { PamExpedienteType } from "@/db/schema";

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
    // cell: ({ row }) => {
    //   // return <TableCellViewer item={row.original} />;
    // },
    enableHiding: false,
  },
  {
    accessorKey: "fechaIngreso",
    header: "Fecha Ingreso",
    // cell: ({ row }) => {
    //   // return <TableCellViewer item={row.original} />;
    // },
  },
  {
    accessorKey: "fechaUltimaModificacion",
    header: "Fecha Movimiento",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <>
          <Label htmlFor={`${row.original.id}-estado`} className="sr-only">
            Estado
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-estado`}
            >
              <SelectValue placeholder="Asignar estado" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="En Tramite">En Tramite</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
