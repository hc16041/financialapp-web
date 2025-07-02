import { CatalogoAgenciasDTO } from "../DTO/CatalogoAgenciasDTO";

export interface ICatalogoAgencias {
  getListadoCatalogoAgencias(
    token: string,
    usuario: string
  ): Promise<CatalogoAgenciasDTO[]>;
  getListadoCatalogoAgenciasXML(token: string, usuario: string): Promise<any>;
  getListadoCatalogoAgenciasExcel(token: string, usuario: string): Promise<any>;
  getListadoCatalogoAgenciasTexto(token: string, usuario: string): Promise<any>;
}
