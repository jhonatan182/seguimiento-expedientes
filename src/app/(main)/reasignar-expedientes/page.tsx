import { columns } from "./columns";
import { ReasignarExpedientesDataTable } from "./data-table";
import { getReasignaciones } from "@/features/reasignaciones/actions/reasignaciones-actions";

export default async function ReasignarExpedientesPage() {
  const reasignaciones = await getReasignaciones();




  return <ReasignarExpedientesDataTable columns={[]} data={[]} />;
  // return <div>Reasignar Expedientes {JSON.stringify(reasignaciones[0], null, 2)}</div>;
}
