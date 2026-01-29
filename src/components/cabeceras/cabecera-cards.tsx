import { PamCabeceraSemanalType } from "@/db/schema";
import { Cabecera } from "./cabecera";

type CabeceraCardsProps = {
  cabecera: PamCabeceraSemanalType | null;
};

export function CabeceraCards({ cabecera }: CabeceraCardsProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
        <Cabecera
          valor={cabecera?.saldoAnterior || 0}
          titulo="Saldo Anterior"
          className="bg-black"
        />

        <Cabecera
          valor={cabecera?.nuevoIngreso || 0}
          titulo="Nuevo Ingreso"
          className="bg-black"
        />

        <Cabecera
          valor={cabecera?.circulacion || 0}
          titulo="En circulación"
          className="bg-black"
        />

        <div className="col-span-1 @5xl/main:col-span-2 grid grid-cols-1 @5xl/main:grid-cols-2 gap-4">
          <Cabecera
            valor={cabecera?.resuelto || 0}
            titulo="Resuelto"
            className="bg-blue-700"
            descripcion1="Con lugar"
            descripcion2="Sin lugar"
            descripcion3="Parcial"
            valorDescripcion1={cabecera?.conLugar || 0}
            valorDescripcion2={cabecera?.sinLugar || 0}
            valorDescripcion3={cabecera?.parcial || 0}
          />

          <Cabecera
            valor={cabecera?.dictamen || 0}
            titulo="Dictamen"
            className="bg-blue-700"
            descripcion1="Circulación"
            descripcion2="Resueltos"
            valorDescripcion1={cabecera?.circulacion || 0}
            valorDescripcion2={cabecera?.resuelto || 0}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Cabecera
            valor={cabecera?.requerido || 0}
            titulo="Requerido"
            className="bg-blue-700"
          />

          <Cabecera
            valor={cabecera?.pendiente || 0}
            titulo="Pendiente"
            className="bg-blue-700"
          />
        </div>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 ">
        <Cabecera
          valor={cabecera?.historicoCirculacion || 0}
          titulo="Histórico Circulación"
          className="bg-gray-500"
        />
      </div>
    </div>
  );
}
