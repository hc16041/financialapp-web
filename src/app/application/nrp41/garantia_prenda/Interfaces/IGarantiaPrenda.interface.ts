import { GarantiaPrendaDTO } from "../DTO/GarantiaPrendaDTO";

export interface IGarantiaPrenda {
  getListadoGarantiaPrenda(
    token: string,
    usuario: string
  ): Promise<GarantiaPrendaDTO[]>;
  getListadoGarantiaPrendaXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaPrendaExcel(token: string, usuario: string): Promise<any>;
}
