import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { ProductosDTO } from "../DTO/ProductosDTO";
import { IProductos } from "../Interfaces/IProductos.interface";

@Injectable({
  providedIn: "root",
})
export class ProductosService implements IProductos {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoProductos(
    token: string,
    usuario: string
  ): Promise<ProductosDTO[]> {
    try {
      const url = `Producto/Lista`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestAsync<ProductosDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoProductos:", error);
      throw error;
    }
  }

  async getListadoProductosXML(token: string, usuario: string): Promise<any> {
    try {
      const url = `Producto/ProductoXML`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestXMLAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoProductosXML:", error);
      throw error;
    }
  }

  async getListadoProductosExcel(token: string, usuario: string): Promise<any> {
    try {
      const url = `Producto/ListaProductoExcel`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestExcelAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoProductosExcel:", error);
      throw error;
    }
  }

  async getListadoProductosTexto(token: string, usuario: string): Promise<any> {
    try {
      const url = `Producto/ExportarTextoPlano`;
      const datos = {
        PTIPOFILTRO: "",
        PFILTRO: "",
        CODUSUARIO: usuario,
      };
      return await this.apiConnectionService.sendRequestTextAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoProductosTexto:", error);
      throw error;
    }
  }
}
