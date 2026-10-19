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
  ): Promise<{ data: BlobPart; fileName: string }> {
    try {
      const url = `BitacoraDescarga/BitacoraDescargaID`;
      const archivoObj = archivo as BitacoraFileRequest & Record<string, unknown>;
      const datos = {
        id: archivoObj.id,
      };

      if (!archivoObj.tipo_archivo) {
        return { data: "", fileName: "sin-datos.txt" };
      }

      // Extraer el tipo principal del MIME type (ej: 'xml' de 'application/xml')
      const tipoArchivo = String(archivoObj.tipo_archivo);
      const tipo = tipoArchivo.split("/")[1]?.toLowerCase() ?? "";

      if (tipo.includes("xml")) {
        return await this.apiConnectionService.sendFileRequestAsync<BlobPart>(
          url,
          "POST",
          { defaultFileName: "bitacora.xml", responseType: "blob" },
          datos,
          { Authorization: token }
        );
      }

      if (tipo.includes("excel") || tipo.includes("spreadsheet")) {
        return await this.apiConnectionService.sendFileRequestAsync<BlobPart>(
          url,
          "POST",
          { defaultFileName: "bitacora.xlsx", responseType: "blob" },
          datos,
          { Authorization: token }
        );
      }

      return await this.apiConnectionService.sendFileRequestAsync<BlobPart>(
        url,
        "POST",
        { defaultFileName: "bitacora.txt", responseType: "blob" },
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getListadoBitacora:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }
}
