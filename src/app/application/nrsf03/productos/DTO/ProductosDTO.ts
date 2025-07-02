import { IsString, Length } from "class-validator";

export class ProductosDTO {
  @IsString()
  @Length(4, 4, {
    message: "El CODIGO_PRODUCTO debe tener exactamente 4 caracteres.",
  })
  CODIGO_PRODUCTO: string;

  @IsString()
  @Length(1, 100, {
    message: "El NOMBRE_PRODUCTO debe tener entre 1 y 100 caracteres.",
  })
  NOMBRE_PRODUCTO: string;

  @IsString()
  @Length(1, 1, {
    message: "El ESTADO_PRODUCTO debe tener exactamente 1 carácter.",
  })
  ESTADO_PRODUCTO: string;

  @IsString()
  @Length(2, 2, {
    message: "El CODIGO_GENERICO_PRODUCTO debe tener exactamente 2 caracteres.",
  })
  CODIGO_GENERICO_PRODUCTO: string;

  constructor(data?: Partial<ProductosDTO>) {
    this.CODIGO_PRODUCTO = data?.CODIGO_PRODUCTO || "";
    this.NOMBRE_PRODUCTO = data?.NOMBRE_PRODUCTO || "";
    this.ESTADO_PRODUCTO = data?.ESTADO_PRODUCTO || "";
    this.CODIGO_GENERICO_PRODUCTO = data?.CODIGO_GENERICO_PRODUCTO || "";
  }
}
