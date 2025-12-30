import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { InvestmentsDTO } from "../DTO/InvestmentsDTO";
import { IInvestments } from "../Interfaces/IInvestments.interface";

@Injectable({
  providedIn: "root",
})
export class InvestmentsService implements IInvestments {
  constructor(private apiConnectionService: ApiConnectionService) {}

  /**
   * Obtiene todas las inversiones del usuario autenticado
   */
  async getInvestments(token: string, usuario: string): Promise<InvestmentsDTO[]> {
    try {
      const url = `Investments`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentsDTO[]>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getInvestments:", error);
      throw error;
    }
  }

  /**
   * Obtiene una inversión por ID
   */
  async getInvestmentById(
    id: number,
    token: string,
    usuario: string
  ): Promise<InvestmentsDTO> {
    try {
      const url = `Investments/${id}`;
      return await this.apiConnectionService.sendRequestAsync<InvestmentsDTO>(
        url,
        "GET",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en getInvestmentById:", error);
      throw error;
    }
  }

  /**
   * Crea una nueva inversión
   */
  async guardarInvestments(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      console.log("=== InvestmentsService.guardarInvestments ===");
      console.log("URL:", "Investments");
      console.log("Método: POST");
      console.log("Datos:", JSON.stringify(datos, null, 2));
      console.log("Token:", token ? "Presente" : "Ausente");
      console.log("Usuario:", usuario);
      
      const url = `Investments`;
      const resultado = await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        datos,
        { Authorization: token }
      );
      
      console.log("Respuesta exitosa:", resultado);
      return resultado;
    } catch (error: any) {
      console.error("=== ERROR en guardarInvestments ===");
      console.error("Error completo:", error);
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response);
      console.error("Error status:", error?.status);
      console.error("Error data:", error?.error || error?.data);
      console.error("Stack trace:", error?.stack);
      throw error;
    }
  }

  /**
   * Actualiza una inversión existente
   */
  async editarInvestments(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Investments/${datos.id}`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "PUT",
        datos,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en editarInvestments:", error);
      throw error;
    }
  }

  /**
   * Elimina una inversión
   */
  async eliminarInvestments(
    id: number,
    token: string,
    usuario: string
  ): Promise<any> {
    try {
      const url = `Investments/${id}`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "DELETE",
        null,
        { Authorization: token }
      );
    } catch (error) {
      console.error("Error en eliminarInvestments:", error);
      throw error;
    }
  }
}

