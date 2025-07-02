import { ReferenciaUnidadDTO } from "../DTO/ReferenciaUnidadDTO";

export interface IReferenciaUnidad {
  getListadoReferenciaUnidad(
    token: string,
    usuario: string
  ): Promise<ReferenciaUnidadDTO[]>;
  getListadoReferenciaUnidadXML(token: string, usuario: string): Promise<any>;
  getListadoReferenciaUnidadExcel(token: string, usuario: string): Promise<any>;
}
