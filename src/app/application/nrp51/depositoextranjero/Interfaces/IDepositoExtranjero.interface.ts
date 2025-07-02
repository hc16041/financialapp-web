import { DepositoExtranjeroDTO } from "../DTO/DepositoExtranjeroDTO";

export interface IDepositoExtranjero {
  getListadoDepositoExtranjero(token: string, usuario: string): Promise<DepositoExtranjeroDTO[]>;
  getListadoDepositoExtranjeroXML(token: string, usuario: string): Promise<any>;
  getListadoDepositoExtranjeroExcel(token: string, usuario: string): Promise<any>;
  getListadoDepositoExtranjeroReporte(token: string, usuario: string): Promise<any>;
}
