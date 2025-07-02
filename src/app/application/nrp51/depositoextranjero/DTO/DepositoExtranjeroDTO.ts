import { IsNumber, IsString, Min } from "class-validator";

export class DepositoExtranjeroDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_BANCO debe tener 10 caracteres." })
  ID_CODIGO_BANCO: string;

  @IsString()
  @Min(1, { message: "El NOM_BANCO debe tener 10 caracteres." })
  NOM_BANCO: string;

  @IsString()
  @Min(1, { message: "El PAIS debe tener 10 caracteres." })
  PAIS: string;

  @IsString()
  @Min(1, { message: "El CATEGORIA debe tener 10 caracteres." })
  CATEGORIA: string;

  @IsNumber()
  @Min(0, { message: "El VALOR debe ser un número positivo." })
  VALOR: number;


  constructor(data?: Partial<DepositoExtranjeroDTO>) {
    this.ID_CODIGO_BANCO = data?.ID_CODIGO_BANCO || "";
    this.NOM_BANCO = data?.NOM_BANCO || "";
    this.PAIS = data?.PAIS || "";
    this.CATEGORIA = data?.CATEGORIA || "";
    this.VALOR = data?.VALOR || 0;
  }
}
