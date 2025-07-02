import { IsNumber, IsString, Min } from "class-validator";

export class DeudaSubordinadaDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_DEUDA debe tener 10 caracteres." })
  ID_CODIGO_DEUDA: string;

  @IsString()
  @Min(1, { message: "El DESC_DEUDA debe tener 10 caracteres." })
  DESC_DEUDA: string;

  @IsNumber()
  @Min(0, { message: "El VALOR_DEUDA debe ser un número positivo." })
  VALOR_DEUDA: number;


  constructor(data?: Partial<DeudaSubordinadaDTO>) {
    this.ID_CODIGO_DEUDA = data?.ID_CODIGO_DEUDA || "";
    this.DESC_DEUDA = data?.DESC_DEUDA || "";
    this.VALOR_DEUDA = data?.VALOR_DEUDA || 0;
  }
}
