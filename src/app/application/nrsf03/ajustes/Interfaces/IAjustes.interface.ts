import { AjustesDTO } from "../DTO/AjustesDTO";

export interface IAjustes {
  getListadoAjustes(token: string, usuario: string): Promise<AjustesDTO[]>;
  getListadoAjustesXML(token: string, usuario: string): Promise<any>;
  getListadoAjustesExcel(token: string, usuario: string): Promise<any>;
  getListadoAjustesTexto(token: string, usuario: string): Promise<any>;
}
