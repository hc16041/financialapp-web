import { Anexo12DTO } from "../DTO/Anexo12DTO";

export interface IAnexo12 {
  getListadoAnexo12(token: string, usuario: string): Promise<Anexo12DTO[]>;
  getListadoAnexo12XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo12Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo12Reporte(token: string, usuario: string): Promise<any>;
}
