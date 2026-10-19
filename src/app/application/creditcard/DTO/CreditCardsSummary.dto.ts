/**
 * Resumen agregado de tarjetas de crédito (GET api/CreditCards/summary).
 *
 * Contrato espejo de `CreditCardsSummaryDto` del backend:
 * - `totalCreditLimit`       → TotalCreditLimit
 * - `totalCurrentBalance`    → TotalCurrentBalance
 * - `totalAvailableCredit`   → TotalAvailableCredit
 */
export interface CreditCardsSummaryDto {
  totalCreditLimit: number;
  totalCurrentBalance: number;
  totalAvailableCredit: number;
}