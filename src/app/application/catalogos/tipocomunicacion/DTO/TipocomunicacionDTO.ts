import { Type } from "class-transformer";
import { IsString, IsNumber, Min, Length } from "class-validator";

export class TipocomunicacionDTO {
  @IsNumber()
  @Min(1, { message: "El código debe ser un número mayor o igual a 1." })
  codigo: number;

  @IsString()
  @Length(1, 100, {
    message: "La descripción debe tener entre 1 y 100 caracteres.",
  })
  descripcion: string;

  constructor(data?: Partial<TipocomunicacionDTO>) {
    this.codigo = data?.codigo ?? 1;
    this.descripcion = data?.descripcion || "";
  }
}
