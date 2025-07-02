import { BalanceProyectadoDTO } from "../DTO/BalanceProyectadoDTO";

export interface IBalanceProyectado {
  getListadoBalanceProyectado(token: string, usuario: string): Promise<BalanceProyectadoDTO[]>;
  getListadoBalanceProyectadoXML(token: string, usuario: string): Promise<any>;
  getListadoBalanceProyectadoExcel(token: string, usuario: string): Promise<any>;
  getListadoBalanceProyectadoReporte(token: string, usuario: string): Promise<any>;
}
