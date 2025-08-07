import { Type } from "class-transformer";
import { IsNumber, IsString, Length, Min } from "class-validator";

export class MerchantsDTO {
  /* "id": 1,
    "name": "Comercio por Defecto",
    "description": "Comercio creado automáticamente para transacciones existentes",
    "category": "General" */

  @IsNumber()
  @Type(() => Number)
  @Min(1, { message: "El id debe ser un número mayor o igual a 1." })
  id: number;

  @IsString()
  @Length(3, 500, {
    message: "El nombre debe tener entre 3 y 500 caracteres.",
  })
  name: string;

  @IsString()
  @Length(3, 500, {
    message: "La descripción debe tener entre 3 y 500 caracteres.",
  })
  description: string;

  @IsString()
  @Length(3, 500, {
    message: "La categoría debe tener entre 3 y 500 caracteres.",
  })
  category: string;

  constructor(data?: Partial<MerchantsDTO>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? "";
    this.description = data?.description ?? "";
    this.category = data?.category ?? "";
  }
}
