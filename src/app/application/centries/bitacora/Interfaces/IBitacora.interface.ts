import { BitacoraDTO } from "../DTO/BitacoraDTO";
import { BitacoraFileRequest } from "../DTO/BitacoraOperation.dto";

export interface IBitacora {
  getListadoBitacora(token: string): Promise<BitacoraDTO[]>;
  getListadoBitacoraArchivo(
    token: string,
    codusuario: string,
    archivo: BitacoraFileRequest | Record<string, unknown>
  ): Promise<unknown>;
}
