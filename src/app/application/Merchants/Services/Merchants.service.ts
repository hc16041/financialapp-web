import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { MerchantsDTO } from "../DTO/MerchantsDTO";
import { MerchantOperationResponse } from "../DTO/MerchantOperation.dto";

@Injectable({
  providedIn: "root",
})
export class MerchantsService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getMerchants(token: string, usuario: string): Promise<MerchantsDTO[]> {
    return await this.apiConnectionService.sendRequestAsync<MerchantsDTO[]>(
      "Merchants",
      "GET",
      null,
      { Authorization: token }
    );
  }

  async guardarMerchants(
    datos: MerchantsDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<MerchantOperationResponse> {
    return await this.apiConnectionService.sendRequestAsync<MerchantOperationResponse>(
      "Merchants",
      "POST",
      datos,
      { Authorization: token }
    );
  }
}
