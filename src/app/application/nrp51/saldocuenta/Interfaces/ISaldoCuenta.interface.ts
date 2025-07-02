import { SaldoCuentaDTO } from "../DTO/SaldoCuentaDTO";

export interface ISaldoCuenta {
  getListadoSaldoCuenta(token: string, usuario: string): Promise<SaldoCuentaDTO[]>;
  getListadoSaldoCuentaXML(token: string, usuario: string): Promise<any>;
  getListadoSaldoCuentaExcel(token: string, usuario: string): Promise<any>;
  getListadoSaldoCuentaReporte(token: string, usuario: string): Promise<any>;
}
