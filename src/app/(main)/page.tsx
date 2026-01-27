import { DataTable } from "@/app/(main)/data-table";
import { SectionCards } from "@/components/main/section-cards";

import data from "../data.json";
import { auth } from "../auth.config";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await auth()
 
  if (!session?.user){
    redirect('/login')
  }

  return (
    <>


    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
    </div>
      <SectionCards />

      <DataTable data={data} />
    </>
  );
}
