import { DataTable } from "@/app/(main)/data-table";
import { SectionCards } from "@/components/main/section-cards";

import data from "../data.json";

export default async function Page() {
  return (
    <>
      <SectionCards />

      <DataTable data={data} />
    </>
  );
}
