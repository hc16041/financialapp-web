import { IsString, IsNumber, Length, Min } from "class-validator";

export class AjustesDTO {
  @IsString()
  @Length(20, 20, {
    message: "El NUMERO_CUENTA debe tener exactamente 20 caracteres.",
  })
  NUMERO_CUENTA: string;

  @IsNumber()
  @Min(0, { message: "El MONTO_AJUSTE debe ser un número positivo." })
  MONTO_AJUSTE: number;

  @IsString()
  @Length(1, 500, {
    message: "El DETALLE_AJUSTE debe tener entre 1 y 500 caracteres.",
  })
  DETALLE_AJUSTE: string;

  constructor(data?: Partial<AjustesDTO>) {
    this.NUMERO_CUENTA = data?.NUMERO_CUENTA || "";
    this.MONTO_AJUSTE = data?.MONTO_AJUSTE || 0;
    this.DETALLE_AJUSTE = data?.DETALLE_AJUSTE || "";
  }
}
