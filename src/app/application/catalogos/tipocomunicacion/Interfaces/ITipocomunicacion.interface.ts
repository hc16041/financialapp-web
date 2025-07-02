import { TipocomunicacionDTO } from "../DTO/TipocomunicacionDTO";

export interface ITipocomunicacion {
  getListadoTipoComunicacion(token: string): Promise<TipocomunicacionDTO[]>;
}
