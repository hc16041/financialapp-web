import { CreditcardDTO } from "../DTO/CreditcardDTO";
import {
  CreditCardOperationResponse,
  CreditCardCreateRequest,
} from "../DTO/CreditCardOperation.dto";

export interface ICreditcard {
  getListadoCreditcard(
    token: string,
    usuario: string
  ): Promise<CreditcardDTO[]>;
  guardarCreditcard(
    datos: CreditCardCreateRequest | CreditcardDTO,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse>;
  editarCreditcard(
    datos: CreditcardDTO | Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse>;
  eliminarCreditcard(
    datos: Record<string, unknown>,
    token: string,
    usuario: string
  ): Promise<CreditCardOperationResponse>;
}

export interface ICreditcardEdit {
  bankName: string;
  creditLimit: number;
  cutOffDay: number;
  paymentDueDay: number;
  annualInterestRate: number;
}
