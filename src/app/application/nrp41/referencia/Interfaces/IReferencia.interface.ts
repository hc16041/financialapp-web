import { ReferenciaDTO } from "../DTO/ReferenciaDTO";

export interface IReferencia {
  getListadoReferencias(
    token: string,
    usuario: string
  ): Promise<ReferenciaDTO[]>;
  getListadoReferenciasXML(token: string, usuario: string): Promise<any>;
  getListadoReferenciasExcel(token: string, usuario: string): Promise<any>;
}
