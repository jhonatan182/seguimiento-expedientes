import { DataTable } from "@/app/(main)/data-table";
import { CabeceraCards } from "@/components/main/cabecera-cards";

import { getSemana } from "../actions/expedientes-actions";

// import data from "../data.json";

export default async function Page() {
  const data = await getSemana();

  return (
    <>
      <CabeceraCards cabecera={data?.cabeceras[0] || null} />

      <DataTable data={data?.expedientes || []} />
    </>
  );
}
