export interface covid19PaisInfo {
  date?: string;
  confirmed?: number;
  deaths?: number;
  recovered?: number;
}

export interface covid19Pais {
  datosPais?: covid19PaisInfo[];
}

