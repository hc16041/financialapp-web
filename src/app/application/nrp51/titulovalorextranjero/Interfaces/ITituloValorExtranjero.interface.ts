import { TituloValorExtranjeroDTO } from "../DTO/TituloValorExtranjeroDTO";

export interface ITituloValorExtranjero {
  getListadoTituloValorExtranjero(token: string, usuario: string): Promise<TituloValorExtranjeroDTO[]>;
  getListadoTituloValorExtranjeroXML(token: string, usuario: string): Promise<any>;
  getListadoTituloValorExtranjeroExcel(token: string, usuario: string): Promise<any>;
  getListadoTituloValorExtranjeroReporte(token: string, usuario: string): Promise<any>;
}
