import { DatoExtracontableDTO } from "../DTO/DatoExtracontableDTO";

export interface IDatoExtracontable {
  getListadoDatoExtracontable(token: string, usuario: string): Promise<DatoExtracontableDTO[]>;
  getListadoDatoExtracontableXML(token: string, usuario: string): Promise<any>;
  getListadoDatoExtracontableExcel(token: string, usuario: string): Promise<any>;
  getListadoDatoExtracontableReporte(token: string, usuario: string): Promise<any>;
}
