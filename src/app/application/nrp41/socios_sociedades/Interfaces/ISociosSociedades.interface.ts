import { SociosSociedadesDTO } from "../DTO/SociosSociedadesDTO";

export interface ISociosSociedades {
  getListadoSociosSociedades(
    token: string,
    usuario: string
  ): Promise<SociosSociedadesDTO[]>;
  getListadoSociosSociedadesXML(token: string, usuario: string): Promise<any>;
  getListadoSociosSociedadesExcel(token: string, usuario: string): Promise<any>;
}
