import { TablaResumenSemanal } from "@/features/resumen-semanal/components/tabla-resumen-semanal";
import { getResumenMensual } from "@/features/resumen-semanal/actions/resumen-semanal-actions";
import { getCurrentMonthCapitalized } from "@/shared/utils";

type PageProps = {
  searchParams: Promise<{ [mes: string]: string | undefined }>;
};

export default async function ResumenSemanalPage({ searchParams }: PageProps) {
  const { mes } = await searchParams;
  const mesActual = getCurrentMonthCapitalized();
  const data = await getResumenMensual(mes || mesActual);

  return (
    <div className="px-4 lg:px-6">
      <TablaResumenSemanal
        data={data.datos}
        cantidadSemanas={data.cantidadSemanas}
        mes={mes || mesActual}
      />
    </div>
  );
}
