import { Type } from "class-transformer";
import {
  IsString,
  IsNumber,
  IsOptional,
  Length,
  Min,
  Max,
  IsInt,
  IsISO8601,
} from "class-validator";

export class DepositosDTO {
  @IsString()
  @Length(3, 10, {
    message: "El CODIGO_PRODUCTO debe tener entre 3 y 10 caracteres.",
  })
  CODIGO_PRODUCTO: string;

  @IsString()
  @Length(12, 20, {
    message: "El NUMERO_CUENTA debe tener entre 12 y 20 caracteres.",
  })
  NUMERO_CUENTA: string;

  @IsString()
  @Length(1, 5, { message: "El AGENCIA debe tener entre 1 y 5 caracteres." })
  AGENCIA: string;

  @IsString()
  @Length(1, 2, {
    message: "El TIPO_PERIODICIDAD debe tener entre 1 y 2 caracteres.",
  })
  TIPO_PERIODICIDAD: string;

  @IsNumber()
  @Min(0, { message: "La TASA_VIGENTE no puede ser menor a 0." })
  TASA_VIGENTE: number;

  @IsNumber()
  @Min(0, { message: "La TASA_INICIAL no puede ser menor a 0." })
  TASA_INICIAL: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INICIAL_TASA: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_FIN_TASA: Date;

  @IsString()
  @Length(2, 2, {
    message: "El TIPO_TASA debe tener exactamente 2 caracteres.",
  })
  TIPO_TASA: string;

  @IsString()
  @Length(2, 2, {
    message: "La FORMA_PAGO_INTERES debe tener exactamente 2 caracteres.",
  })
  FORMA_PAGO_INTERES: string;

  @IsNumber()
  TASA_REFERENCIA: number;

  @IsNumber()
  PORCENTAJE_PAGAR_INTERESES: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  DIA_CORTE: Date;

  @IsNumber()
  PORCENTAJE_COMISION: number;

  @IsString()
  @Length(1, 2, {
    message: "El TIPO_TITULARIDAD debe tener entre 1 y 2 caracteres.",
  })
  TIPO_TITULARIDAD: string;

  @IsInt()
  @Min(1, { message: "El NUMERO_TITULARES debe ser al menos 1." })
  NUMERO_TITULARES: number;

  @IsString()
  @Length(1, 5, {
    message: "El PLAZO_CUENTA debe tener entre 1 y 5 caracteres.",
  })
  PLAZO_CUENTA: string;

  @IsString()
  @Length(1, 5, {
    message: "Las CONDICIONES_ESPECIALES deben tener entre 1 y 5 caracteres.",
  })
  CONDICIONES_ESPECIALES: string;

  @IsOptional()
  @IsString()
  EXPLICACION_CONDICIONES_ESPECIALES?: string | null;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_APERTURA: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VENCIMIENTO: Date;

  @IsNumber()
  @Min(0, { message: "El MONTO_MINIMO no puede ser menor a 0." })
  MONTO_MINIMO: number;

  @IsString()
  @Length(10, 20, {
    message: "El CODIGO_CUENTA_CONTABLE debe tener entre 10 y 20 caracteres.",
  })
  CODIGO_CUENTA_CONTABLE: string;

  @IsNumber()
  FONDOS_COMPENSACION: number;

  @IsNumber()
  FONDOS_RESTRINGIDOS: number;

  @IsNumber()
  TRANSACCIONES_PENDIENTES: number;

  @IsString()
  @Length(1, 1, {
    message: "La NEGOCIABILIDAD_DEPOSITO debe tener exactamente 1 carácter.",
  })
  NEGOCIABILIDAD_DEPOSITO: string;

  @IsString()
  @Length(3, 3, {
    message:
      "La MONEDA debe tener exactamente 3 caracteres (Ejemplo: USD, EUR).",
  })
  MONEDA: string;

  @IsNumber()
  SALDO_DEPOSITO_MONEDA_ORIGINAL: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_ULTIMA_TRANSACCION: Date;

  @IsNumber()
  SALDO_CAPITAL: number;

  @IsNumber()
  SALDO_INTERESES: number;

  @IsNumber()
  SALDO_TOTAL: number;

  @IsString()
  @Length(1, 2, { message: "El ESTADO debe tener entre 1 y 2 caracteres." })
  ESTADO: string;

  constructor(data?: Partial<DepositosDTO>) {
    this.CODIGO_PRODUCTO = data?.CODIGO_PRODUCTO || "";
    this.NUMERO_CUENTA = data?.NUMERO_CUENTA || "";
    this.AGENCIA = data?.AGENCIA || "";
    this.TIPO_PERIODICIDAD = data?.TIPO_PERIODICIDAD || "";
    this.TASA_VIGENTE = data?.TASA_VIGENTE ?? 0;
    this.TASA_INICIAL = data?.TASA_INICIAL ?? 0;
    this.FECHA_INICIAL_TASA = data?.FECHA_INICIAL_TASA || new Date();
    this.FECHA_FIN_TASA = data?.FECHA_FIN_TASA || new Date();
    this.TIPO_TASA = data?.TIPO_TASA || "";
    this.FORMA_PAGO_INTERES = data?.FORMA_PAGO_INTERES || "";
    this.TASA_REFERENCIA = data?.TASA_REFERENCIA ?? 0;
    this.PORCENTAJE_PAGAR_INTERESES = data?.PORCENTAJE_PAGAR_INTERESES ?? 0;
    this.DIA_CORTE = data?.DIA_CORTE || new Date();
    this.PORCENTAJE_COMISION = data?.PORCENTAJE_COMISION ?? 0;
    this.TIPO_TITULARIDAD = data?.TIPO_TITULARIDAD || "";
    this.NUMERO_TITULARES = data?.NUMERO_TITULARES ?? 1;
    this.PLAZO_CUENTA = data?.PLAZO_CUENTA || "";
    this.CONDICIONES_ESPECIALES = data?.CONDICIONES_ESPECIALES || "";
    this.EXPLICACION_CONDICIONES_ESPECIALES =
      data?.EXPLICACION_CONDICIONES_ESPECIALES || null;
    this.FECHA_APERTURA = data?.FECHA_APERTURA || new Date();
    this.FECHA_VENCIMIENTO = data?.FECHA_VENCIMIENTO || new Date();
    this.MONTO_MINIMO = data?.MONTO_MINIMO ?? 0;
    this.CODIGO_CUENTA_CONTABLE = data?.CODIGO_CUENTA_CONTABLE || "";
    this.FONDOS_COMPENSACION = data?.FONDOS_COMPENSACION ?? 0;
    this.FONDOS_RESTRINGIDOS = data?.FONDOS_RESTRINGIDOS ?? 0;
    this.TRANSACCIONES_PENDIENTES = data?.TRANSACCIONES_PENDIENTES ?? 0;
    this.NEGOCIABILIDAD_DEPOSITO = data?.NEGOCIABILIDAD_DEPOSITO || "";
    this.MONEDA = data?.MONEDA || "";
    this.SALDO_DEPOSITO_MONEDA_ORIGINAL =
      data?.SALDO_DEPOSITO_MONEDA_ORIGINAL ?? 0;
    this.FECHA_ULTIMA_TRANSACCION =
      data?.FECHA_ULTIMA_TRANSACCION || new Date();
    this.SALDO_CAPITAL = data?.SALDO_CAPITAL ?? 0;
    this.SALDO_INTERESES = data?.SALDO_INTERESES ?? 0;
    this.SALDO_TOTAL = data?.SALDO_TOTAL ?? 0;
    this.ESTADO = data?.ESTADO || "";
  }
}
