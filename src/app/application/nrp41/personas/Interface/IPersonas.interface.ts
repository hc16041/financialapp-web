import { PersonaDTO } from "../DTO/PersonaDTO";

export interface IPersonas {
  getListadoPersonas(token: string, usuario: string): Promise<PersonaDTO[]>;
  getListadoPersonasXML(token: string, usuario: string): Promise<any>;
  getListadoPersonasExcel(token: string, usuario: string): Promise<any>;
}
