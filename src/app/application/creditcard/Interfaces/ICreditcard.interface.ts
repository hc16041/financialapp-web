import { CreditcardDTO } from "../DTO/CreditcardDTO";

export interface ICreditcard {
  getListadoCreditcard(
    token: string,
    usuario: string
  ): Promise<CreditcardDTO[]>;
  guardarCreditcard(datos: any, token: string, usuario: string): Promise<any>;
  editarCreditcard(datos: any, token: string, usuario: string): Promise<any>;
  eliminarCreditcard(datos: any, token: string, usuario: string): Promise<any>;
  getListadoCreditcardXML(token: string, usuario: string): Promise<any>;
  getListadoCreditcardExcel(token: string, usuario: string): Promise<any>;
}

export interface ICreditcardEdit {
  bankName: string;
  creditLimit: number;
  cutOffDay: number;
  paymentDueDay: number;
  annualInterestRate: number;
}
