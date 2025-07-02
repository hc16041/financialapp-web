import { GarantiaPrendaDTO } from "../../garantia_prenda/DTO/GarantiaPrendaDTO";

export interface IGarantiaPrendaria {
  getListadoGarantiaPrendaria(
    token: string,
    usuario: string
  ): Promise<GarantiaPrendaDTO[]>;
  getListadoGarantiaPrendariaXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaPrendariaExcel(
    token: string,
    usuario: string
  ): Promise<any>;
}
