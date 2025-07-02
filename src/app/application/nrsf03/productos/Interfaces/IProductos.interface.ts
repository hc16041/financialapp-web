import { ProductosDTO } from "../DTO/ProductosDTO";

export interface IProductos {
  getListadoProductos(token: string, usuario: string): Promise<ProductosDTO[]>;
  getListadoProductosXML(token: string, usuario: string): Promise<any>;
  getListadoProductosExcel(token: string, usuario: string): Promise<any>;
  getListadoProductosTexto(token: string, usuario: string): Promise<any>;
}
