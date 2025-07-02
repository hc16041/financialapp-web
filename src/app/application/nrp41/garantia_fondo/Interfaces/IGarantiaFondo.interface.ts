import { GarantiaFondoDTO } from "../DTO/GarantiaFondoDTO";

export interface IGarantiaFondo {
  getListadoGarantiaFondo(
    token: string,
    usuario: string
  ): Promise<GarantiaFondoDTO[]>;
  getListadoGarantiaFondoXML(token: string, usuario: string): Promise<any>;
  getListadoGarantiaFondoExcel(token: string, usuario: string): Promise<any>;
}
