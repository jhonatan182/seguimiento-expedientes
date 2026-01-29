import { SessionProvider } from "next-auth/react";

import { DialogExpediente } from "@/components/expedientes";
import { getExpedientes } from "../actions/expedientes-actions";
import { CabeceraCards } from "@/components/cabeceras";
import { SelectSemanas } from "@/components/semanas";
import { DataTable } from "@/app/(main)/data-table";
import { columns } from "./columns";
import { getSemanas } from "../actions/semanas-actions";
import { cookies } from "next/headers";

type PageProps = {
  searchParams: Promise<{ [semana: string]: string | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const { semana } = await searchParams;

  const semanaCookieId = cookieStore.get("semanaId")?.value;

  const data = await getExpedientes(
    semana ? parseInt(semana) : parseInt(semanaCookieId || "1"),
  );
  const semanas = await getSemanas();

  return (
    <>
      <SelectSemanas
        semanas={semanas}
        selectedSemanaId={
          semana ? parseInt(semana) : parseInt(semanaCookieId || "1")
        }
      />

      <CabeceraCards cabecera={data?.cabeceras[0] || null} />

      <SessionProvider>
        <div className="w-full flex justify-end gap-6 px-4 lg:px-6">
          <DialogExpediente />
        </div>

        <DataTable data={data?.expedientes || []} columns={columns} />
      </SessionProvider>
    </>
  );
}
