import { GarantiaHipotecariaDTO } from "../DTO/GarantiaHipotecariaDTO";

export interface IGarantiaHipotecaria {
  getListadoGarantiashipotecarias(
    token: string,
    usuario: string
  ): Promise<GarantiaHipotecariaDTO[]>;
  getListadoGarantiashipotecariasXML(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoGarantiashipotecariasExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
