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
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.saldoAnterior || 0}
            </CardTitle>
            <CardDescription className="text-sm">
              Saldo Anterior
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center   text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.nuevoIngreso || 0}
            </CardTitle>
            <CardDescription className="text-sm">Nuevo Ingreso</CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.circulacion || 0}
            </CardTitle>
            <CardDescription className="text-sm">
              En circulación
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.requerido || 0}
            </CardTitle>
            <CardDescription className="text-sm">Requerido</CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.pendiente || 0}
            </CardTitle>
            <CardDescription className="text-sm">Pendiente</CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.historicoCirculacion || 0}
            </CardTitle>
            <CardDescription className="text-sm">
              Histórico Circulación
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              Por calcular
            </CardTitle>
            <CardDescription className="text-sm">
              Total expedientes
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
        <Card className="@container/card">
          <CardHeader className="flex flex-col items-start justify-center text-center gap-2">
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.resuelto || 0}
            </CardTitle>
            <CardDescription className="text-sm">Resuelto</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
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
        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-5xl">
              {cabecera?.dictamen || 0}
            </CardTitle>
            <CardDescription className="text-sm">Dictamen</CardDescription>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
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
    </div>
  );
}
