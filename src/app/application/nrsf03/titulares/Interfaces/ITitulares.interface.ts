import { TitularesDTO } from "../DTO/TitularesDTO";

export interface ITitulares {
  getListadoTitulares(token: string, usuario: string): Promise<TitularesDTO[]>;
  getListadoTitularesXML(token: string, usuario: string): Promise<any>;
  getListadoTitularesExcel(token: string, usuario: string): Promise<any>;
  getListadoTitularesTexto(token: string, usuario: string): Promise<any>;
}
