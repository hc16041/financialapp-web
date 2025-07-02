import { DepositosGarantizadosDTO } from "../DTO/DepositosGarantizadosDTO";

export interface IDepositosGarantizados {
  getListadoDepositosGarantizados(
    token: string,
    usuario: string
  ): Promise<DepositosGarantizadosDTO[]>;
  getListadoDepositosGarantizadosXML(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoDepositosGarantizadosExcel(
    token: string,
    usuario: string
  ): Promise<any>;
  getListadoDepositosGarantizadosTexto(
    token: string,
    usuario: string
  ): Promise<any>;
}
