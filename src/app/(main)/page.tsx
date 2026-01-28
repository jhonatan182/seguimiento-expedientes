import { DataTable } from "@/app/(main)/data-table";
import { CabeceraCards } from "@/components/main/cabecera-cards";

import { getSemana } from "../actions/expedientes-actions";

import { columns } from "./columns";
import { DialogCustom } from "@/components/ui/custom/dialog-custom";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { CreateExpedienteForm } from "@/components/expedientes/create-expediente-form";

export default async function Page() {
  const data = await getSemana();

  return (
    <>
      <CabeceraCards cabecera={data?.cabeceras[0] || null} />

      <div className="w-full flex justify-end gap-6 px-4 lg:px-6">
        <DialogCustom
          trigger={
            <Button variant="outline" size="sm">
              <IconPlus />
              <span className="hidden lg:inline">Agregar Expediente</span>
            </Button>
          }
          title="Agregar Expediente"
        >
          <CreateExpedienteForm />
        </DialogCustom>
      </div>

      <DataTable data={data?.expedientes || []} columns={columns} />
    </>
  );
}
