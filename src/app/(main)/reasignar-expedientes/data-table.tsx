"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import { Pagination } from "@/features/shared/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/features/shared/components/ui/table";
import { Input } from "@/features/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/components/ui/select";
import { useGetEstadosExpedientes } from "@/features/shared/hooks";
import { Button } from "@/features/shared/components/ui/button";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function ReasignarExpedientesDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [estadoFilter, setEstadoFilter] = React.useState<string>("");



  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div
      className="w-full flex-col justify-start gap-6 px-4 lg:px-6"
      data-tour="tabla-expedientes"
    >
      <div className="flex flex-col items-center py-4 gap-5 lg:flex-row lg:items-start lg:gap-5">
        <Input
          placeholder="Filtrar expediente..."
          value={
            (table.getColumn("expediente")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("expediente")?.setFilterValue(event.target.value)
          }
          className="w-full lg:max-w-sm"
          id="expediente"
        />
        {/* <Select
          value={estadoFilter}
          onValueChange={(value) => {
            setEstadoFilter(value);
            table
              .getColumn("estado")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
          name="estado"
        >
          <SelectTrigger
            className="w-full **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate lg:max-w-sm"
            size="default"
          >
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">Todos</SelectItem>
            {estados.map((estado) => (
              <SelectItem key={estado.value} value={estado.value}>
                {estado.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <Button
          onClick={() => {
            setEstadoFilter("");
            table.resetColumnFilters();
            table.resetSorting();
            table.resetPagination();
          }}
          className="w-full lg:max-w-sm"
        >
          Limpiar filtros
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-8">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay datos disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </div>
  );
}
