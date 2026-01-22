import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { IBitacora } from "../Interfaces/IBitacora.interface";
import { BitacoraDTO } from "../DTO/BitacoraDTO";
import { BitacoraFileRequest } from "../DTO/BitacoraOperation.dto";

@Injectable({
  providedIn: "root",
})
export class BitacoraService implements IBitacora {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Devuelve el listado de bitacora.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoBitacora(token: string): Promise<BitacoraDTO[]> {
    try {
      const url = `BitacoraDescarga/Lista`;
      const datos = {
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-12-31",
      };
      return await this.apiConnectionService.sendRequestAsync<BitacoraDTO[]>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoBitacora:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
  /**
   * Devuelve el listado de bitacora en formato XML.
   *
   * @returns La respuesta del servidor en formato JSON.
   */
  async getListadoBitacoraArchivo(
    token: string,
    codusuario: string,
    archivo: BitacoraFileRequest | Record<string, unknown>
  ): Promise<unknown> {
    try {
      const url = `BitacoraDescarga/BitacoraDescargaID`;
      const archivoObj = archivo as BitacoraFileRequest & Record<string, unknown>;
      const datos = {
        id: archivoObj.id,
      };

      if (archivoObj.tipo_archivo) {
        // Extraer el tipo principal del MIME type (ej: 'xml' de 'application/xml')
        const tipoArchivo = String(archivoObj.tipo_archivo);
        const tipo = tipoArchivo
          .split("/")[1]
          ?.toLowerCase() as keyof typeof metodos;

        // Mapeo de tipos MIME a métodos
        const metodos = {
          xml: this.apiConnectionService.sendRequestXMLAsync,
          excel: this.apiConnectionService.sendRequestExcelAsync,
          "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            this.apiConnectionService.sendRequestExcelAsync, // Para MIME types antiguos de Excel
          plain: this.apiConnectionService.sendRequestTextAsync, // text/plain
          csv: this.apiConnectionService.sendRequestTextAsync,
          texto: this.apiConnectionService.sendRequestTextAsync, // Si tienes un tipo personalizado
        };

        // Buscar el método (con validación de alias)
        const metodo = metodos[tipo];

        if (!metodo) {
          throw new Error(
            `Tipo de archivo no soportado: ${tipoArchivo}`
          );
        }

        return await metodo.call(
          this.apiConnectionService,
          url,
          "POST",
          {
            id: archivoObj.id,
          },
          { Authorization: token }
        );
      }
      return null;
    } catch (error) {
      console.error("Error en getListadoBitacora:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
