import { CreditCard } from "./credit-card.model";

export interface Transaction {
  id?: number;
  creditCardId: number;
  amount: number;
  type: number;
  description: string;
  date?: string;
  isProcessed?: boolean;
  creditCard?: CreditCard;
}