import { BitacoraDTO } from "../DTO/BitacoraDTO";

export interface IBitacora {
  getListadoBitacora(token: string): Promise<BitacoraDTO[]>;
  getListadoBitacoraArchivo(
    token: string,
    codusuario: string,
    archivo: any
  ): Promise<any[]>;
}
