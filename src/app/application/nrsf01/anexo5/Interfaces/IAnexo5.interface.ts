import { Anexo5DTO } from "../DTO/Anexo5DTO";

export interface IAnexo5 {
  getListadoAnexo5(token: string, usuario: string): Promise<Anexo5DTO[]>;
  getListadoAnexo5XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo5Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo5Reporte(token: string, usuario: string): Promise<any>;
}
