import { SessionProvider } from "next-auth/react";

import { DialogExpediente } from "@/components/expedientes";
import { getExpedientes } from "../actions/expedientes-actions";
import { CabeceraCards } from "@/components/cabeceras";
import { SelectSemanas } from "@/components/semanas";
import { DataTable } from "@/app/(main)/data-table";
import { columns } from "./columns";
import { getSemanas } from "../actions/semanas-actions";
import { cookies } from "next/headers";
import { buildWeek } from "@/utils/dates";

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

  return (
    <>
      <SelectSemanas
        semanas={semanas}
        selectedSemanaId={parseInt(semanaActualId)}
      />

      <CabeceraCards cabecera={data?.cabeceras[0] || null} />

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
