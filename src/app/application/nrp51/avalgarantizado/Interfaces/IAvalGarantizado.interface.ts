import { AvalGarantizadoDTO } from "../DTO/AvalGarantizadoDTO";

export interface IAvalGarantizado {
  getListadoAvalGarantizado(token: string, usuario: string): Promise<AvalGarantizadoDTO[]>;
  getListadoAvalGarantizadoXML(token: string, usuario: string): Promise<any>;
  getListadoAvalGarantizadoExcel(token: string, usuario: string): Promise<any>;
  getListadoAvalGarantizadoReporte(token: string, usuario: string): Promise<any>;
}
