import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";

@Injectable({
  providedIn: "root",
})
export class MerchantsService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getMerchants(token: string, usuario: string): Promise<any[]> {
    return await this.apiConnectionService.sendRequestAsync<any[]>(
      "Merchants",
      "GET",
      null,
      { Authorization: token }
    );
  }

  async guardarMerchants(
    datos: any,
    token: string,
    usuario: string
  ): Promise<any> {
    return await this.apiConnectionService.sendRequestAsync<any>(
      "Merchants",
      "POST",
      datos,
      { Authorization: token }
    );
  }
}
