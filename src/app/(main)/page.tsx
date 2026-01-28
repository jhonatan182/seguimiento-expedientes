import { DataTable } from "@/app/(main)/data-table";
import { SectionCards } from "@/components/main/section-cards";

import data from "../data.json";
import { getExpedientesDiarios } from "../actions/expedientes-actions";

export default async function Page() {
  const datax = await getExpedientesDiarios();
  // console.log({ datax });
  return (
    <>
      <SectionCards />

      <DataTable data={data} />
    </>
  );
}
