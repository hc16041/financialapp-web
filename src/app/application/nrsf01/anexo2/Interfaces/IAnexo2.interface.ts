import { Anexo2DTO } from "../DTO/Anexo2DTO";

export interface IAnexo2 {
  getListadoAnexo2(token: string, usuario: string): Promise<Anexo2DTO[]>;
  getListadoAnexo2XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo2Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo2Reporte(token: string, usuario: string): Promise<any>;
}
