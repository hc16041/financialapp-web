import { JuntaDirectivaDTO } from "../DTO/JuntaDirectivaDTO";

export interface IJuntaDirectiva {
  getListadoJuntaDirectiva(
    token: string,
    usuario: string
  ): Promise<JuntaDirectivaDTO[]>;
  getListadoJuntaDirectivaXML(token: string, usuario: string): Promise<any>;
  getListadoJuntaDirectivaExcel(token: string, usuario: string): Promise<any>;
}
