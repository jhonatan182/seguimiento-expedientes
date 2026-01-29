import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PamCabeceraSemanalType } from "@/db/schema";

type CabeceraCardsProps = {
  cabecera: PamCabeceraSemanalType | null;
};

export function CabeceraCards({ cabecera }: CabeceraCardsProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        <Card className="@container/card bg-black">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold text-white tabular-nums @[250px]/card:text-5xl">
              {cabecera?.saldoAnterior || 0}
            </CardTitle>
            <CardDescription className="text-sm text-white">
              Saldo Anterior
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card bg-black">
          <CardHeader className="flex flex-col items-center justify-center   text-center gap-2">
            <CardTitle className="text-4xl font-bold text-white tabular-nums @[250px]/card:text-5xl">
              {cabecera?.nuevoIngreso || 0}
            </CardTitle>
            <CardDescription className="text-sm text-white">
              Nuevo Ingreso
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card bg-black">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold text-white tabular-nums @[250px]/card:text-5xl">
              {cabecera?.circulacion || 0}
            </CardTitle>
            <CardDescription className="text-sm text-white">
              En circulación
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="col-span-1 @5xl/main:col-span-2 grid grid-cols-1 @5xl/main:grid-cols-2 gap-4">
          <Card className="@container/card bg-blue-700">
            <CardHeader className="flex flex-col items-start justify-center text-center gap-2 ">
              <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
                {cabecera?.resuelto || 0}
              </CardTitle>
              <CardDescription className="text-sm text-white">
                Resuelto
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col text-white items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                <p>Con lugar:</p>
                <span>{cabecera?.conLugar || 0}</span>
              </div>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <p>Sin lugar:</p>
                <span>{cabecera?.sinLugar || 0}</span>
              </div>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <p>Parcial:</p>
                <span>{cabecera?.parcial || 0}</span>
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card bg-blue-700">
            <CardHeader>
              <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
                {cabecera?.dictamen || 0}
              </CardTitle>
              <CardDescription className="text-sm text-white">
                Dictamen
              </CardDescription>
            </CardHeader>
            <CardFooter className="text-white flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                <p>Circulacion:</p>
                <span>{cabecera?.circulacion || 0}</span>
              </div>
              <div className="line-clamp-1 flex gap-2 font-medium">
                <p>Resueltos:</p>
                <span>{cabecera?.resuelto || 0}</span>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="@container/card bg-blue-700">
            <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
              <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
                {cabecera?.requerido || 0}
              </CardTitle>
              <CardDescription className="text-sm text-white">
                Requerido
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="@container/card bg-blue-700">
            <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
              <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
                {cabecera?.pendiente || 0}
              </CardTitle>
              <CardDescription className="text-sm text-white">
                Pendiente
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 ">
        <Card className="@container/card bg-gray-500">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.historicoCirculacion || 0}
            </CardTitle>
            <CardDescription className="text-sm text-white">
              Histórico Circulación
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
