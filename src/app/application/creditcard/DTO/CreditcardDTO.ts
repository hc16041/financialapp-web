import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
  IsBoolean,
  IsOptional,
  IsDecimal,
} from "class-validator";

export class CreditcardDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsString()
  @Length(2, 100, {
    message: "El nombre del banco debe tener entre 2 y 100 caracteres.",
  })
  bankName: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0, {
    message: "El límite de crédito debe ser un número mayor o igual a 0.",
  })
  creditLimit: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El saldo actual debe ser un número mayor o igual a 0." })
  currentBalance: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, {
    message: "El crédito disponible debe ser un número mayor o igual a 0.",
  })
  availableCredit: number;

  @IsOptional()
  @IsISO8601({ strict: true })
  @Type(() => Date)
  lastCutOffDate?: Date;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El día de corte debe ser un número entre 1 y 31." })
  cutOffDay: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El día de pago debe ser un número entre 1 y 31." })
  paymentDueDay: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, {
    message: "La tasa de interés anual debe ser un número mayor o igual a 0.",
  })
  annualInterestRate: number;

  @IsBoolean()
  isActive: boolean;

  constructor(data?: Partial<CreditcardDTO>) {
    this.id = data?.id ?? 0;
    this.bankName = data?.bankName || "";
    this.creditLimit = data?.creditLimit ?? 0;
    this.currentBalance = data?.currentBalance ?? 0;
    this.availableCredit = data?.availableCredit ?? 0;
    this.lastCutOffDate = data?.lastCutOffDate || new Date();
    this.cutOffDay = data?.cutOffDay ?? 1;
    this.paymentDueDay = data?.paymentDueDay ?? 1;
    this.annualInterestRate = data?.annualInterestRate ?? 0;
    this.isActive = data?.isActive ?? true;
  }
}
