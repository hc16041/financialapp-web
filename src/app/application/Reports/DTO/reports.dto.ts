export interface ExpenseDetailDto {
  transactionId: number;
  transactionDate: string;
  amount: number;
  description: string;
  merchantName: string;
  transactionType: string;
}

export interface PaymentDetailDto {
  transactionId: number;
  transactionDate: string;
  amount: number;
  description: string;
  merchantName: string;
}

export interface CardExpensesReportDto {
  creditCardId: number;
  bankName: string;
  periodStart: string;
  periodEnd: string;
  totalExpenses: number;
  transactionCount: number;
  expenses: ExpenseDetailDto[];
}

export interface CardPaymentsReportDto {
  creditCardId: number;
  bankName: string;
  periodStart: string;
  periodEnd: string;
  totalPayments: number;
  paymentCount: number;
  payments: PaymentDetailDto[];
}

export interface CardConsumptionDto {
  creditCardId: number;
  bankName: string;
  creditLimit: number;
  totalExpenses: number;
  totalPayments: number;
  transactionCount: number;
  currentBalance: number;
  availableCredit: number;
  utilizationPercentage: number;
}

export interface MerchantExpenseDetailDto {
  merchantId: number;
  merchantName: string;
  category: string;
  totalAmount: number;
  transactionCount: number;
  percentageOfTotal: number;
}

export interface MerchantExpensesReportDto {
  periodStart: string;
  periodEnd: string;
  totalExpenses: number;
  totalTransactions: number;
  merchants: MerchantExpenseDetailDto[];
}

export interface CashExpensesReportDto {
  periodStart: string;
  periodEnd: string;
  totalExpenses: number;
  transactionCount: number;
  expenses: ExpenseDetailDto[];
}
