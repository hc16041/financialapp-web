import { Type } from "class-transformer";
import {
  IsNumber,
  IsString,
  IsBoolean,
  Length,
  Min,
} from "class-validator";

export class WithdrawalMethodsDTO {
  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: "El id debe ser un número mayor o igual a 0." })
  id: number;

  @IsString()
  @Length(1, 500, {
    message: "El nombre debe tener entre 1 y 500 caracteres.",
  })
  name: string;

  @IsString()
  @Length(0, 1000, {
    message: "La descripción debe tener máximo 1000 caracteres.",
  })
  description: string;

  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  requiresCreditCard: boolean;

  constructor(data?: Partial<WithdrawalMethodsDTO>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? "";
    this.description = data?.description ?? "";
    this.isActive = data?.isActive ?? true;
    this.requiresCreditCard = data?.requiresCreditCard ?? false;
  }
}

