import { TablaResumenSemanal } from "@/components/resumen/tabla-resumen-semanal";
import { getResumenMensual } from "@/app/actions/resumen-semanal-actions";
import { getCurrentMonthCapitalized } from "@/utils";

type PageProps = {
  searchParams: Promise<{ [mes: string]: string | undefined }>;
};

export default async function ResumenSemanalPage({ searchParams }: PageProps) {
  const { mes } = await searchParams;
  const mesActual = getCurrentMonthCapitalized();
  const data = await getResumenMensual(mes || mesActual);

  return (
    <div className="px-4 lg:px-6">
      <h1 className="text-2xl font-bold mb-6">Resumen Semanal</h1>

      <TablaResumenSemanal
        data={data.datos}
        cantidadSemanas={data.cantidadSemanas}
        mes={mes || mesActual}
      />
    </div>
  );
}
