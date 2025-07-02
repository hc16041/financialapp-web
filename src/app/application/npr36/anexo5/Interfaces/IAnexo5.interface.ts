import { Anexo5DTO } from "../DTO/Anexo5DTO";

export interface IAnexo5 {
  getListadoAnexo5(token: string, usuario: string): Promise<Anexo5DTO[]>;
  guardarAnexo5(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo5(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo5(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo5XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo5Excel(token: string, usuario: string): Promise<any>;
}
