import { ReferenciaGastoDTO } from "../DTO/ReferenciaGastoDTO";

export interface IReferenciaGasto {
  getListadoReferenciaGasto(
    token: string,
    usuario: string
  ): Promise<ReferenciaGastoDTO[]>;
  getListadoReferenciaGastoXML(token: string, usuario: string): Promise<any>;
  getListadoReferenciaGastoExcel(token: string, usuario: string): Promise<any>;
}
