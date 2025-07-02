import { ClientesDTO } from "../DTO/ClientesDTO";

export interface IClientes {
  getListadoClientes(token: string, usuario: string): Promise<ClientesDTO[]>;
  getListadoClientesExcel(token: string, usuario: string): Promise<any>;
  getListadoClientesXML(token: string, usuario: string): Promise<any>;
  getListadoClientesTexto(token: string, usuario: string): Promise<any>;
}
