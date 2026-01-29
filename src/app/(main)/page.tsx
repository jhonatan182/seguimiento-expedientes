import { SessionProvider } from "next-auth/react";

import { DialogExpediente } from "@/components/expedientes";
import { getSemana } from "../actions/expedientes-actions";
import { CabeceraCards } from "@/components/cabeceras";
import { DataTable } from "@/app/(main)/data-table";
import { columns } from "./columns";

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
