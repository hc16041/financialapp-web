import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  Min,
  Length,
  IsDateString,
  IsISO8601,
  IsEnum,
} from "class-validator";

export enum SavingTransactionType {
  Deposit = 1,
  Withdrawal = 2,
}

export class SavingTransactionDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @Type(() => Number)
  @Min(0.01, { message: "El monto debe ser mayor a cero." })
  amount: number;

  @IsString()
  @Length(1, 500, {
    message: "La descripción debe tener entre 1 y 500 caracteres.",
  })
  description: string;

  @IsEnum(SavingTransactionType)
  transactionType: SavingTransactionType;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El userId debe ser un número mayor o igual a 1." })
  userId: number;

  constructor(data?: Partial<SavingTransactionDTO>) {
    this.id = data?.id ?? 0;
    this.date = data?.date || new Date();
    this.amount = data?.amount ?? 0;
    this.description = data?.description || "";
    this.transactionType = data?.transactionType ?? SavingTransactionType.Deposit;
    this.userId = data?.userId ?? 0;
  }
}
