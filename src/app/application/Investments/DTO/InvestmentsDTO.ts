import { Type } from "class-transformer";
import {
  IsNumber,
  IsDateString,
  IsISO8601,
  Min,
} from "class-validator";

export class InvestmentsDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El id debe ser un número mayor o igual a 0." })
  id: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El platformId debe ser un número mayor o igual a 1." })
  platformId: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El amount debe ser un número mayor o igual a 0." })
  amount: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "La commission debe ser un número mayor o igual a 0." })
  commission: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El transactionType debe ser un número mayor o igual a 1." })
  transactionType: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  transactionDate: Date;

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El withdrawalMethod debe ser un número mayor o igual a 1." })
  withdrawalMethod: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El creditCardId debe ser un número mayor o igual a 0." })
  creditCardId: number;

  // Campo virtual para el checkbox "libre de comisión" (no se guarda en BD)
  libreDeComision?: boolean;

  constructor(data?: Partial<InvestmentsDTO>) {
    this.id = data?.id ?? 0;
    this.platformId = data?.platformId ?? 0;
    this.amount = data?.amount ?? 0;
    this.commission = data?.commission ?? 0;
    this.transactionType = data?.transactionType ?? 1;
    this.transactionDate = data?.transactionDate || new Date();
    this.withdrawalMethod = data?.withdrawalMethod ?? 1;
    this.creditCardId = data?.creditCardId ?? 0;
    this.libreDeComision = data?.libreDeComision ?? false;
  }
}

