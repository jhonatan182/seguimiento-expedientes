import { cookies } from "next/headers";

import { getExpedientes } from "../../features/expedientes/actions/expedientes-actions";
import { getSemanas } from "../../features/semanas/actions/semanas-actions";
import { buildWeek, enableNextWeekButtonByDay } from "@/shared/utils/dates";
import { CabeceraCards } from "@/features/cabeceras/components";
import { SelectSemanas } from "@/features/semanas/components";
import { optimizedColumns } from "./columns-optimized";
import { DataTable } from "@/app/(main)/data-table";
import { Badge } from "@/shared/components/ui/badge";
import {
  DialogExpediente,
  NextWeekButton,
} from "@/features/expedientes/components";

type PageProps = {
  searchParams: Promise<{ [semana: string]: string | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { semana } = await searchParams;

  const semanas = await getSemanas();
  const semanaDescripcion = buildWeek();

  // Encuentra la semana actual (la de esta semana)
  const isCurrentWeek = semanas.find(
    (s) => s.descripcion === semanaDescripcion,
  );

  // Determina qué semana mostrar
  let semanaActualId: number;

  if (semana && !isNaN(Number(semana))) {
    // Si viene semana en URL y es válida, úsala
    const semanaFromUrl = semanas.find((s) => s.id === Number(semana));
    semanaActualId = semanaFromUrl?.id ?? (isCurrentWeek?.id || 1);
  } else {
    // Si no, intenta usar la cookie
    const cookieStore = await cookies();
    const semanaCookieId = cookieStore.get("semanaId")?.value;
    semanaActualId = semanaCookieId
      ? Number(semanaCookieId)
      : isCurrentWeek?.id || 1;
  }

  const data = await getExpedientes(semanaActualId);

  if (!data) {
    throw new Error("No se encontró la semana");
  }

  const isShowingCurrentWeek = isCurrentWeek?.id === semanaActualId;

  return (
    <>
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-start lg:items-start lg:gap-1.5">
        <div className="flex flex-col items-center-safe gap-2 ">
          <SelectSemanas semanas={semanas} selectedSemanaId={semanaActualId} />
          {isShowingCurrentWeek && <Badge variant="green">Semana actual</Badge>}
        </div>
        {isShowingCurrentWeek || enableNextWeekButtonByDay() ? (
          <NextWeekButton />
        ) : (
          <NextWeekButton />
        )}
      </div>

      <CabeceraCards cabecera={data.cabeceras[0]} />

      <div className="w-full flex justify-end gap-6 px-4 lg:px-6">
        <DialogExpediente
          isCurrentWeek={isShowingCurrentWeek}
          estadosOptions={data.estados || []}
        />
      </div>

      <DataTable
        data={data?.expedientes || []}
        columns={optimizedColumns}
        estados={data?.estados || []}
      />
    </>
  );
}
