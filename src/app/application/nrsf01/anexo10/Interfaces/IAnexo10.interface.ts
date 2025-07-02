import { Anexo10DTO } from "../DTO/Anexo10DTO";

export interface IAnexo10 {
  getListadoAnexo10(token: string, usuario: string): Promise<Anexo10DTO[]>;
  getListadoAnexo10XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo10Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo10Reporte(token: string, usuario: string): Promise<any>;
}
