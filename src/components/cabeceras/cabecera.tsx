import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type CabeceraProps = {
  valor: number;
  titulo: string;
  descripcion1?: string;
  descripcion2?: string;
  descripcion3?: string;
  descripcion4?: string;
  valorDescripcion1?: number;
  valorDescripcion2?: number;
  valorDescripcion3?: number;
  valorDescripcion4?: number;
  className?: string;
};

export function Cabecera({
  valor,
  titulo,
  descripcion1,
  descripcion2,
  descripcion3,
  descripcion4,
  valorDescripcion1,
  valorDescripcion2,
  valorDescripcion3,
  valorDescripcion4,
  className,
}: CabeceraProps) {
  return (
    <Card className={`${className} "@container/card"`}>
      <CardHeader className="flex flex-col items-center justify-center text-center gap-2 ">
        <CardTitle className="text-4xl text-white font-bold tabular-nums @[250px]/card:text-5xl">
          {valor}
        </CardTitle>
        <CardDescription className="text-sm text-white ">
          {titulo}
        </CardDescription>
      </CardHeader>

      {descripcion1 && (
        <CardFooter className="flex-col text-white items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <p>{descripcion1}</p>
            <span>{valorDescripcion1 || 0}</span>
          </div>
          {descripcion2 && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              <p>{descripcion2}</p>
              <span>{valorDescripcion2 || 0}</span>
            </div>
          )}
          {descripcion3 && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              <p>{descripcion3}</p>
              <span>{valorDescripcion3 || 0}</span>
            </div>
          )}
          {descripcion4 && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              <p>{descripcion4}</p>
              <span>{valorDescripcion4 || 0}</span>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
