import { ReferenciaCanceladaDTO } from "../DTO/ReferenciaCanceladaDTO";

export interface IReferenciaCancelada {
  getListadoReferenciaCancelada(
    token: string,
    usuario: string
  ): Promise<ReferenciaCanceladaDTO[]>;
  getListadoReferenciaCanceladaXML(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoReferenciaCanceladaExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
