export interface ResumenSemanalRow {
  backgroundColor: string;
  textColor: string;
  categoria: string;
  esSubcategoria?: boolean;
  esTotal?: boolean;
  semana1: number;
  semana2: number;
  semana3: number;
  semana4: number;
  semana5?: number;
  total: number;
  [key: string]: number | string | boolean | undefined; // Para permitir acceso dinámico
}

export interface ResumenMensualData {
  mes: string;
  analista: string;
  semanas: string[];
  datos: ResumenSemanalRow[];
}

export interface ResumenAnalista {
  datos: ResumenSemanalRow[];
  cantidadSemanas: number;
}
