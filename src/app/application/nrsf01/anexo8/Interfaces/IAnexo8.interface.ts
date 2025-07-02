import { Anexo8DTO } from "../DTO/Anexo8DTO";

export interface IAnexo8 {
  getListadoAnexo8(token: string, usuario: string): Promise<Anexo8DTO[]>;
  getListadoAnexo8XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo8Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo8Reporte(token: string, usuario: string): Promise<any>;
}
