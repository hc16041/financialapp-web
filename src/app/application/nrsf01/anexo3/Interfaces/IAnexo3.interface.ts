import { Anexo3DTO } from "../DTO/Anexo3DTO";

export interface IAnexo3 {
  getListadoAnexo3(token: string, usuario: string): Promise<Anexo3DTO[]>;
  getListadoAnexo3XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo3Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo3Reporte(token: string, usuario: string): Promise<any>;
}
