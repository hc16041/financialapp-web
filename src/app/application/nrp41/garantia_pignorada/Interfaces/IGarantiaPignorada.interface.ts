import { GarantiaPignoradaDTO } from "../DTO/GarantiaPignoradaDTO";

export interface IGarantiaPignorada {
  getListadoGarantiaPignorada(
    token: string,
    usuario: string
  ): Promise<GarantiaPignoradaDTO[]>;
  getListadoGarantiaPignoradaXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaPignoradaExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
