import { Anexo7DTO } from "../DTO/Anexo7DTO";

export interface IAnexo7 {
  getListadoAnexo7(token: string, usuario: string): Promise<Anexo7DTO[]>;
  getListadoAnexo7XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo7Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo7Reporte(token: string, usuario: string): Promise<any>;
}
