import { DepositosDTO } from "../DTO/DepositosDTO";

export interface IDepositos {
  getListadoDepositos(token: string, usuario: string): Promise<DepositosDTO[]>;
  getListadoDepositosXML(token: string, usuario: string): Promise<any>;
  getListadoDepositosExcel(token: string, usuario: string): Promise<any>;
  getListadoDepositosTexto(token: string, usuario: string): Promise<any>;
}
