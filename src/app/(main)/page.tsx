import { SessionProvider } from "next-auth/react";
import { cookies } from "next/headers";

import { getExpedientes } from "../actions/expedientes-actions";
import { DialogExpediente, NextWeekButton } from "@/components/expedientes";
import { getSemanas } from "../actions/semanas-actions";
import { CabeceraCards } from "@/components/cabeceras";
import { SelectSemanas } from "@/components/semanas";
import { DataTable } from "@/app/(main)/data-table";
import { buildWeek } from "@/utils/dates";
import { columns } from "./columns";

type PageProps = {
  searchParams: Promise<{ [semana: string]: string | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  let { semana } = await searchParams;

  const semanaDescripcion = buildWeek();
  const semanas = await getSemanas();
  const isCurrentWeek = semanas.find(
    (s) => s.descripcion === semanaDescripcion,
  );

  let semanaActualId: string = "";

  if (isNaN(Number(semana))) {
    semana = "0";
  }

  const semanaActual = semanas.find((s) => s.id.toString() === semana);

  if (!semanaActual) {
    semanaActualId =
      semanas.find((s) => s.descripcion === semanaDescripcion)?.id.toString() ||
      "1";
  } else {
    const cookieStore = await cookies();
    const semanaCookieId = cookieStore.get("semanaId")?.value;
    semanaActualId = semanaCookieId || "1";
  }

  const data = await getExpedientes(parseInt(semanaActualId));

  if (!data) {
    throw new Error("No se encontro la semana");
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <SelectSemanas
          semanas={semanas}
          selectedSemanaId={parseInt(semanaActualId)}
        />
        <NextWeekButton />
      </div>

      <CabeceraCards cabecera={data.cabeceras[0]} />

      <SessionProvider>
        <div className="w-full flex justify-end gap-6 px-4 lg:px-6">
          <DialogExpediente
            isCurrentWeek={
              isCurrentWeek?.id === parseInt(semanaActualId) ? true : false
            }
          />
        </div>

        <DataTable data={data?.expedientes || []} columns={columns} />
      </SessionProvider>
    </>
  );
}
