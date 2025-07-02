import { GarantiaBonoDTO } from "../DTO/GarantiaBonoDTO";

export interface IGarantiaBono {
  getListadoGarantiaBono(
    token: string,
    usuario: string
  ): Promise<GarantiaBonoDTO[]>;
  getListadoGarantiaBonoXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaBonoExcel(token: string, usuario: string): Promise<any>;
}
