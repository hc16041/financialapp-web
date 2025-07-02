import { IsString, IsNumber, IsDateString } from "class-validator";

export class BitacoraDTO {
  @IsNumber()
  id: number;

  @IsString()
  norma: string;

  @IsString()
  nombre_archivo: string;

  @IsString()
  codusuario: string;

  @IsDateString()
  fecha_descarga: string;

  @IsString()
  tipo_archivo: string;

  @IsString()
  text_archivo: string;

  constructor(data?: Partial<BitacoraDTO>) {
    this.id = data?.id ?? 0;
    this.norma = data?.norma ?? "";
    this.nombre_archivo = data?.nombre_archivo ?? "";
    this.codusuario = data?.codusuario ?? "";
    this.fecha_descarga = data?.fecha_descarga ?? new Date().toISOString();
    this.tipo_archivo = data?.tipo_archivo ?? "";
    this.text_archivo = data?.text_archivo ?? "";
  }
}
