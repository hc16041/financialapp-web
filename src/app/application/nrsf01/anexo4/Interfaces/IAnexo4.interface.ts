import { Anexo4DTO } from "../DTO/Anexo4DTO";

export interface IAnexo4 {
  getListadoAnexo4(token: string, usuario: string): Promise<Anexo4DTO[]>;
  getListadoAnexo4XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo4Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo4Reporte(token: string, usuario: string): Promise<any>;
}
