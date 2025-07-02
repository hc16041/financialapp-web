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
  IsObject,
} from "class-validator";
import { CreditcardDTO } from "../../creditcard/DTO/CreditcardDTO";

export class TransactionsDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El monto debe ser un número mayor o igual a 0." })
  amount: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El tipo debe ser un número mayor o igual a 1." })
  type: number;

  @IsString()
  @Length(3, 500, {
    message: "La descripción debe tener entre 3 y 500 caracteres.",
  })
  description: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  date: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  transactionDate: Date;

  @IsBoolean()
  isProcessed: boolean;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El creditCardId debe ser un número mayor o igual a 1." })
  creditCardId: number;

  @IsOptional()
  @IsObject()
  creditCard?: CreditcardDTO;

  constructor(data?: Partial<TransactionsDTO>) {
    this.id = data?.id ?? 0;
    this.amount = data?.amount ?? 0;
    this.type = data?.type ?? 1;
    this.description = data?.description || "";
    this.date = data?.date || new Date();
    this.transactionDate = data?.transactionDate || new Date();
    this.isProcessed = data?.isProcessed ?? false;
    this.creditCardId = data?.creditCardId ?? 1;
    this.creditCard = data?.creditCard
      ? new CreditcardDTO(data.creditCard)
      : undefined;
  }
}
