import { DocsClienteDTO } from "../DTO/DocsClienteDTO";

export interface IDocsCliente {
  getListadoDocsCliente(
    token: string,
    usuario: string
  ): Promise<DocsClienteDTO[]>;
  getListadoDocsClienteXML(token: string, usuario: string): Promise<any>;
  getListadoDocsClienteExcel(token: string, usuario: string): Promise<any>;
  getListadoDocsClienteTexto(token: string, usuario: string): Promise<any>;
}
