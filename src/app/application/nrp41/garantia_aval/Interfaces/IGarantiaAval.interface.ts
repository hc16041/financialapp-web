import { GarantiaAvalDTO } from "../DTO/GarantiaAvalDTO";

export interface IGarantiaAval {
  getListadoGarantiaAval(
    token: string,
    usuario: string
  ): Promise<GarantiaAvalDTO[]>;
  getListadoGarantiaAvalXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaAvalExcel(token: string, usuario: string): Promise<any>;
}
