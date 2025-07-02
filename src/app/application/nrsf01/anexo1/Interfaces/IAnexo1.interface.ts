import { Anexo1DTO } from "../DTO/Anexo1DTO";

export interface IAnexo1 {
  getListadoAnexo1(token: string, usuario: string): Promise<Anexo1DTO[]>;
  getListadoAnexo1XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo1Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo1Reporte(token: string, usuario: string): Promise<any>;
}
