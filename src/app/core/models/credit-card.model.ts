export interface CreditCard {
  id: number;
  bankName: string;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  lastCutOffDate: string;
  cutOffDay: number;
  paymentDueDay: number;
  annualInterestRate: number;
  isActive: boolean;
}