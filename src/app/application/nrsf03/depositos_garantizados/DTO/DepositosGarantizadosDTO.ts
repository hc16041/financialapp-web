import { IsString, IsNumber, IsOptional, Length, Min } from "class-validator";

export class DepositosGarantizadosDTO {
  @IsNumber()
  @Min(1, { message: "El CORRELATIVO debe ser un número positivo." })
  CORRELATIVO: number;

  @IsString()
  @Length(9, 9, { message: "El NIU debe tener exactamente 9 caracteres." })
  NIU: string;

  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_NOMBRE: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El SEGUNDO_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  SEGUNDO_NOMBRE?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El TERCER_NOMBRE debe tener entre 1 y 50 caracteres.",
  })
  TERCER_NOMBRE?: string;

  @IsString()
  @Length(1, 50, {
    message: "El PRIMER_APELLIDO debe tener entre 1 y 50 caracteres.",
  })
  PRIMER_APELLIDO: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El SEGUNDO_APELLIDO debe tener entre 1 y 50 caracteres.",
  })
  SEGUNDO_APELLIDO?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: "El APELLIDO_CASADA debe tener entre 1 y 50 caracteres.",
  })
  APELLIDO_CASADA?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100, {
    message: "La RAZON_SOCIAL debe tener entre 1 y 100 caracteres.",
  })
  RAZON_SOCIAL?: string;

  @IsString()
  @Length(3, 3, {
    message: "El CODIGO_DOCUMENTO debe tener exactamente 3 caracteres.",
  })
  CODIGO_DOCUMENTO: string;

  @IsString()
  @Length(8, 20, {
    message: "El NUMERO_DOCUMENTO debe tener entre 8 y 20 caracteres.",
  })
  NUMERO_DOCUMENTO: string;

  @IsNumber()
  @Min(0, { message: "El TOTAL_CUENTAS debe ser un número positivo." })
  TOTAL_CUENTAS: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_CAPITAL debe ser un número positivo." })
  SALDO_CAPITAL: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_INTERESES debe ser un número positivo." })
  SALDO_INTERESES: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_GARANTIZADO debe ser un número positivo." })
  SALDO_GARANTIZADO: number;

  constructor(data?: Partial<DepositosGarantizadosDTO>) {
    this.CORRELATIVO = data?.CORRELATIVO || 0;
    this.NIU = data?.NIU || "";
    this.PRIMER_NOMBRE = data?.PRIMER_NOMBRE || "";
    this.SEGUNDO_NOMBRE = data?.SEGUNDO_NOMBRE || "";
    this.TERCER_NOMBRE = data?.TERCER_NOMBRE || "";
    this.PRIMER_APELLIDO = data?.PRIMER_APELLIDO || "";
    this.SEGUNDO_APELLIDO = data?.SEGUNDO_APELLIDO || "";
    this.APELLIDO_CASADA = data?.APELLIDO_CASADA || "";
    this.RAZON_SOCIAL = data?.RAZON_SOCIAL || "";
    this.CODIGO_DOCUMENTO = data?.CODIGO_DOCUMENTO || "";
    this.NUMERO_DOCUMENTO = data?.NUMERO_DOCUMENTO || "";
    this.TOTAL_CUENTAS = data?.TOTAL_CUENTAS || 0;
    this.SALDO_CAPITAL = data?.SALDO_CAPITAL || 0;
    this.SALDO_INTERESES = data?.SALDO_INTERESES || 0;
    this.SALDO_GARANTIZADO = data?.SALDO_GARANTIZADO || 0;
  }
}
