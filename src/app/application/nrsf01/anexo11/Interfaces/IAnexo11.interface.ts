import { Anexo11DTO } from "../DTO/Anexo11DTO";

export interface IAnexo11 {
  getListadoAnexo11(token: string, usuario: string): Promise<Anexo11DTO[]>;
  getListadoAnexo11XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo11Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo11Reporte(token: string, usuario: string): Promise<any>;
}
