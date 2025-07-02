import { DeudaSubordinadaDTO } from "../DTO/DeudaSubordinadaDTO";

export interface IDeudaSubordinada {
  getListadoDeudaSubordinada(token: string, usuario: string): Promise<DeudaSubordinadaDTO[]>;
  getListadoDeudaSubordinadaXML(token: string, usuario: string): Promise<any>;
  getListadoDeudaSubordinadaExcel(token: string, usuario: string): Promise<any>;
  getListadoDeudaSubordinadaReporte(token: string, usuario: string): Promise<any>;
}
