import { GarantiaFiduciariaDTO } from "../DTO/GarantiaFiduciariaDTO";

export interface IGarantiaFiduciaria {
  getListadoGarantiaFiduciaria(
    token: string,
    usuario: string
  ): Promise<GarantiaFiduciariaDTO[]>;
  getListadoGarantiaFiduciariaXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaFiduciariaExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
