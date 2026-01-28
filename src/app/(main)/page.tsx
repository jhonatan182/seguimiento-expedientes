import { DataTable } from "@/app/(main)/data-table";
import { SectionCards } from "@/components/main/section-cards";

import { getSemana } from "../actions/expedientes-actions";

// import data from "../data.json";

export default async function Page() {
  const data = await getSemana();

  return (
    <>
      <SectionCards cabecera={data?.cabeceras[0] || null} />

      <DataTable data={data?.expedientes || []} />
    </>
  );
}
