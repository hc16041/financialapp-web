import { ReferenciaGarantiaDTO } from "../DTO/ReferenciaGarantiaDTO";

export interface IReferenciaGarantia {
  getListadoReferenciasGarantia(
    token: string,
    usuario: string
  ): Promise<ReferenciaGarantiaDTO[]>;
  getListadoReferenciasGarantiaXML(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoReferenciasGarantiaExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
