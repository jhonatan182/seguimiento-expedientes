"use client";

import { useRouter } from "next/navigation";

import { ResumenSemanalRow } from "@/interfaces/resumen-semanal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MESES } from "@/const";

type TablaResumenSemanalProps = {
  data: ResumenSemanalRow[];
  cantidadSemanas: number;
  mes: string;
};

export function TablaResumenSemanal({
  data,
  cantidadSemanas,
  mes,
}: TablaResumenSemanalProps) {
  const router = useRouter();

  const onValueChange = (value: string) => {
    router.replace(`/resumen-semanal?mes=${value}`);
  };

  const renderRow = (row: ResumenSemanalRow, isSubcategoria = false) => {
    const textColorClass = isSubcategoria ? "text-gray-600" : "text-gray-900";
    const fontWeightClass = isSubcategoria ? "font-normal" : "font-semibold";
    const bgColorClass = isSubcategoria ? "bg-gray-50" : "bg-white";

    return (
      <tr className={bgColorClass} key={row.categoria}>
        <td
          className={`px-4 py-2 text-left ${textColorClass} ${fontWeightClass}`}
        >
          {isSubcategoria && "　　"}
          {row.categoria}
        </td>

        {Array.from({ length: cantidadSemanas }).map((_, index) => (
          <td key={index} className={`px-4 py-2 text-center ${textColorClass}`}>
            {row[`semana${index + 1}`]}
          </td>
        ))}

        <td className={`px-4 py-2 text-center ${textColorClass} font-bold`}>
          {row.total}
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="mes-select" className="text-sm font-medium">
            Mes:
          </label>
          <Select value={mes} onValueChange={onValueChange} defaultValue={mes}>
            <SelectTrigger id="mes-select" className="w-40">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {MESES.map((mes) => (
                <SelectItem key={mes} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold capitalize">
                  {mes}
                </th>

                {Array.from({ length: cantidadSemanas }).map((_, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center font-semibold"
                  >
                    Semana {index + 1}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => renderRow(row, row.esSubcategoria))}
            </tbody>
          </table>
        </div>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay datos disponibles para el mes seleccionado
        </div>
      )}
    </div>
  );
}
