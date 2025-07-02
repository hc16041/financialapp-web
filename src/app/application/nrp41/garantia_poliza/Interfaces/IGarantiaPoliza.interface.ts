import { GarantiaPolizaDTO } from "../DTO/GarantiaPolizaDTO";

export interface IGarantiaPoliza {
  getListadoGarantiaPoliza(
    token: string,
    usuario: string
  ): Promise<GarantiaPolizaDTO[]>;
  getListadoGarantiaPolizaXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaPolizaExcel(token: string, usuario: string): Promise<any>;
}
