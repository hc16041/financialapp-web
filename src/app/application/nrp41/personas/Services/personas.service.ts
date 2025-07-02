// Auth Service to interact with external API
import { Injectable } from "@angular/core";
import { GlobalComponent } from "src/app/global-component";
import { IPersonas } from "../Interface/IPersonas.interface";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { PersonaDTO } from "../DTO/PersonaDTO";

@Injectable({
  providedIn: "root",
})
export class PersonaService implements IPersonas {
  private readonly apiUrl = GlobalComponent.AUTH_API;

  constructor(private apiConnectionService: ApiConnectionService) {}

  async getListadoPersonas(
    token: string,
    usuario: string
  ): Promise<PersonaDTO[]> {
    const url = `Persona/Lista`;

    const datos = {
      PTIPOFILTRO: "",
      PFILTRO: "",
      CODUSUARIO: usuario,
    };

    const response = this.apiConnectionService.sendRequestAsync<PersonaDTO[]>(
      url,
      "POST",
      datos,
      { Authorization: token }
    );
    return response;
  }

  async getListadoPersonasXML(token: string, usuario: string): Promise<any> {
    const url = `Persona/ListaPersonaXML`;

    const datos = {
      PTIPOFILTRO: "",
      PFILTRO: "",
      CODUSUARIO: usuario,
    };

    const respose = this.apiConnectionService.sendRequestXMLAsync<any>(
      url,
      "POST",
      datos,
      { Authorization: token }
    );
    return respose;
  }

  async getListadoPersonasExcel(token: string, usuario: string): Promise<any> {
    const url = `Persona/ListaPersonaExcel`;

    const datos = {
      PTIPOFILTRO: "",
      PFILTRO: "",
      CODUSUARIO: usuario,
    };

    const respose = this.apiConnectionService.sendRequestExcelAsync(
      url,
      "POST",
      datos,
      { Authorization: token }
    );
    return respose;
  }
}
