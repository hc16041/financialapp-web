import { Anexo8DTO } from "../DTO/Anexo8DTO";

export interface IAnexo8 {
  getListadoAnexo8(token: string, usuario: string): Promise<Anexo8DTO[]>;
  guardarAnexo8(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo8(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo8(datos: any, token: string, usuario: string): Promise<any>;
  desactivarAnexo8(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo8XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo8Excel(token: string, usuario: string): Promise<any>;
}
