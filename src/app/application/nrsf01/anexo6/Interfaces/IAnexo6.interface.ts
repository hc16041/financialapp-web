import { Anexo6DTO } from "../DTO/Anexo6DTO";

export interface IAnexo6 {
  getListadoAnexo6(token: string, usuario: string): Promise<Anexo6DTO[]>;
  getListadoAnexo6XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo6Excel(token: string, usuario: string): Promise<any>;
  getListadoAnexo6Reporte(token: string, usuario: string): Promise<any>;
}
