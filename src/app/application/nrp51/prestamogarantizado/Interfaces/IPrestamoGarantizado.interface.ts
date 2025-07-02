import { PrestamoGarantizadoDTO } from "../DTO/PrestamoGarantizadoDTO";

export interface IPrestamoGarantizado {
  getListadoPrestamoGarantizado(token: string, usuario: string): Promise<PrestamoGarantizadoDTO[]>;
  getListadoPrestamoGarantizadoXML(token: string, usuario: string): Promise<any>;
  getListadoPrestamoGarantizadoExcel(token: string, usuario: string): Promise<any>;
  getListadoPrestamoGarantizadoReporte(token: string, usuario: string): Promise<any>;
}
