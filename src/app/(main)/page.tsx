import { DialogExpediente } from "@/components/expedientes";
import { CabeceraCards } from "@/components/main/cabecera-cards";
import { getSemana } from "../actions/expedientes-actions";
import { DataTable } from "@/app/(main)/data-table";
import { columns } from "./columns";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const data = await getSemana();

  return (
    <>
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
