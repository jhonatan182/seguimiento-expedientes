"use client";

import { PamSemanaType } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/actions/cookies-actions";

type SelectSemanasProps = {
  semanas: PamSemanaType[];
  selectedSemanaId: number;
};

export function SelectSemanas({
  semanas,
  selectedSemanaId,
}: SelectSemanasProps) {
  const router = useRouter();

  const handleChange = async (value: string) => {
    await setCookie("semanaId", value);
    router.replace(`/?semana=${value}`);
  };

  return (
    <div className="px-4 lg:px-6">
      <Select
        onValueChange={handleChange}
        defaultValue={selectedSemanaId.toString()}
      >
        <SelectTrigger aria-invalid={false}>
          <SelectValue placeholder="Seleccionar semana" />
        </SelectTrigger>
        <SelectContent
          aria-describedby={"select-semana-description"}
          position="popper"
        >
          {semanas.map((semana) => (
            <SelectItem key={semana.id} value={semana.id.toString()}>
              {semana.descripcion}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
