import {
  IsString,
  IsNumber,
  Length,
  Min,
  Max,
  IsISO8601,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class ReferenciaDTO {
  @IsString()
  NIT_DEUDOR: string;

  @IsString()
  @Length(2, 2, { message: "COD_CARTERA debe tener exactamente 2 caracteres." })
  COD_CARTERA: string;

  @IsString()
  @Length(2, 2, { message: "COD_ACTIVO debe tener exactamente 2 caracteres." })
  COD_ACTIVO: string;

  @IsString()
  @Length(6, 6, {
    message: "NUM_REFERENCIA debe tener exactamente 6 caracteres.",
  })
  NUM_REFERENCIA: string;

  @IsNumber()
  @Min(0)
  MONTO_REFERENCIA: number;

  @IsNumber()
  @Min(0)
  SALDO_REFERENCIA: number;

  @IsNumber()
  @Min(0)
  SALDO_VIGENTE_K: number;

  @IsNumber()
  @Min(0)
  SALDO_VENCIDO_K: number;

  @IsNumber()
  @Min(0)
  SALDO_VIGENTE_I: number;

  @IsNumber()
  @Min(0)
  SALDO_VENCIDO_I: number;

  @IsNumber()
  @Min(0)
  ABONO_DEPOSITO: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_OTORGAMIENTO: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_VENCIMIENTO: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_CASTIGO: Date;

  @IsString()
  ESTADO_CREDITO: string;

  @IsNumber()
  @Min(0)
  SALDO_MORA_K: number;

  @IsNumber()
  @Min(0)
  SALDO_MORA_I: number;

  @IsNumber()
  @Min(0)
  DIAS_MORA_K: number;

  @IsNumber()
  @Min(0)
  DIAS_MORA_I: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INICIO_MORA_K: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_INICIO_MORA_I: Date;

  @IsNumber()
  PAGO_CAPITAL: number;

  @IsNumber()
  PAGO_INTERES: number;

  @IsNumber()
  @Min(0)
  PERIODO_GRACIA_K: number;

  @IsNumber()
  @Min(0)
  PERIODO_GRACIA_I: number;

  @IsString()
  GARANTE: string;

  @IsString()
  EMISION: string;

  @IsString()
  PAIS_DESTINO_CREDITO: string;

  @IsString()
  DESTINO: string;

  @IsString()
  CODIGO_MONEDA: string;

  @IsNumber()
  @Min(0)
  TASA_INTERES: number;

  @IsNumber()
  @Min(0)
  TASA_CONTRACTUAL: number;

  @IsNumber()
  @Min(0)
  TASA_REFERENCIA: number;

  @IsNumber()
  @Min(0)
  TASA_EFECTIVA: number;

  @IsString()
  TIPO_TASA_INTERES: string;

  @IsString()
  TIPO_PRESTAMO: string;

  @IsString()
  CODIGO_RECURSO: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  ULTIMA_FECHA_VENC: Date;

  @IsNumber()
  @Min(0)
  DIAS_PRORROGA: number;

  @IsNumber()
  @Min(0)
  MONTO_DESEMBOLSADO: number;

  @IsString()
  TIPO_CREDITO: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_ULTIMO_PAGO_K: Date;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_ULTIMO_PAGO_I: Date;

  @IsNumber()
  @Min(0)
  DIA_PAGO_K: number;

  @IsNumber()
  @Min(0)
  DIA_PAGO_I: number;

  @IsNumber()
  @Min(0)
  CUOTA_MORA_K: number;

  @IsNumber()
  @Min(0)
  CUOTA_MORA_I: number;

  @IsNumber()
  @Min(0)
  MONTO_CUOTA: number;

  @IsString()
  CUENTA_CONTABLE_K: string;

  @IsString()
  CUENTA_CONTABLE_I: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_CANCELACION: Date;

  @IsNumber()
  @Min(0)
  ADELANTO_CAPITAL: number;

  @IsNumber()
  @Min(0)
  RIESGO_NETO: number;

  @IsNumber()
  @Min(0)
  SALDO_SEGURO: number;

  @IsNumber()
  @Min(0)
  SALDO_COSTAS_PROCESALES: number;

  @IsString()
  TIPO_TARJETA_CREDITO: string;

  @IsString()
  CLASE_TARJETA_CREDITO: string;

  @IsString()
  PRODUCTO_TARJETA_CREDITO: string;

  @IsNumber()
  @Min(0)
  VALOR_GARANTIA_CONS: number;

  @IsString()
  DISTRITO_OTORGAMIENTO: string;

  @IsNumber()
  @Min(0)
  RESERVA_REFERENCIA: number;

  @IsString()
  ETAPA_JUDICIAL: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_DEMANDA: Date;

  @IsNumber()
  @Min(0)
  PLAZO_CREDITO: number;

  @IsString()
  ORDEN_DESCUENTO: string;

  @IsString()
  CATEGORIA_RIESGO_REF: string;

  @IsNumber()
  @Min(0)
  RESERVA_CONSTITUIR: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  PORCENTAJE_RESERVA: number;

  @IsNumber()
  @Min(0)
  PAGO_CUOTA: number;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_PAGO: Date;

  @IsNumber()
  @Min(0)
  @Max(100)
  PORCENTA_RESERVA_DESCON: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  PORCENTA_ADICIONA_DESCON: number;

  @IsString()
  DEPTO_DESTINO_CREDITO: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  PORC_RESERVA_REFERENCIA: number;

  @IsNumber()
  CALCULO_BRECHA: number;

  @IsNumber()
  AJUSTE_BRECHA: number;

  @IsString()
  PROGRAMA_ASIST_CAFE: string;

  @IsISO8601({ strict: true })
  @Type(() => Date)
  FECHA_CUMP_CAFE: Date;

  constructor(data?: Partial<ReferenciaDTO>) {
    this.NIT_DEUDOR = data?.NIT_DEUDOR || "";
    this.COD_CARTERA = data?.COD_CARTERA || "";
    this.COD_ACTIVO = data?.COD_ACTIVO || "";
    this.NUM_REFERENCIA = data?.NUM_REFERENCIA || "";
    this.MONTO_REFERENCIA = data?.MONTO_REFERENCIA ?? 0;
    this.SALDO_REFERENCIA = data?.SALDO_REFERENCIA ?? 0;
    this.SALDO_VIGENTE_K = data?.SALDO_VIGENTE_K ?? 0;
    this.SALDO_VENCIDO_K = data?.SALDO_VENCIDO_K ?? 0;
    this.SALDO_VIGENTE_I = data?.SALDO_VIGENTE_I ?? 0;
    this.SALDO_VENCIDO_I = data?.SALDO_VENCIDO_I ?? 0;
    this.ABONO_DEPOSITO = data?.ABONO_DEPOSITO ?? 0;
    this.FECHA_OTORGAMIENTO = data?.FECHA_OTORGAMIENTO || new Date();
    this.FECHA_VENCIMIENTO = data?.FECHA_VENCIMIENTO || new Date();
    this.FECHA_CASTIGO = data?.FECHA_CASTIGO || new Date();
    this.ESTADO_CREDITO = data?.ESTADO_CREDITO || "";
    this.SALDO_MORA_K = data?.SALDO_MORA_K ?? 0;
    this.SALDO_MORA_I = data?.SALDO_MORA_I ?? 0;
    this.DIAS_MORA_K = data?.DIAS_MORA_K ?? 0;
    this.DIAS_MORA_I = data?.DIAS_MORA_I ?? 0;
    this.FECHA_INICIO_MORA_K = data?.FECHA_INICIO_MORA_K || new Date();
    this.FECHA_INICIO_MORA_I = data?.FECHA_INICIO_MORA_I || new Date();
    this.PAGO_CAPITAL = data?.PAGO_CAPITAL ?? 0;
    this.PAGO_INTERES = data?.PAGO_INTERES ?? 0;
    this.PERIODO_GRACIA_K = data?.PERIODO_GRACIA_K ?? 0;
    this.PERIODO_GRACIA_I = data?.PERIODO_GRACIA_I ?? 0;
    this.GARANTE = data?.GARANTE || "";
    this.EMISION = data?.EMISION || "";
    this.PAIS_DESTINO_CREDITO = data?.PAIS_DESTINO_CREDITO || "";
    this.DESTINO = data?.DESTINO || "";
    this.CODIGO_MONEDA = data?.CODIGO_MONEDA || "";
    this.TASA_INTERES = data?.TASA_INTERES ?? 0;
    this.TASA_CONTRACTUAL = data?.TASA_CONTRACTUAL ?? 0;
    this.TASA_REFERENCIA = data?.TASA_REFERENCIA ?? 0;
    this.TASA_EFECTIVA = data?.TASA_EFECTIVA ?? 0;
    this.TIPO_TASA_INTERES = data?.TIPO_TASA_INTERES || "";
    this.TIPO_PRESTAMO = data?.TIPO_PRESTAMO || "";
    this.CODIGO_RECURSO = data?.CODIGO_RECURSO || "";
    this.ULTIMA_FECHA_VENC = data?.ULTIMA_FECHA_VENC || new Date();
    this.DIAS_PRORROGA = data?.DIAS_PRORROGA ?? 0;
    this.MONTO_DESEMBOLSADO = data?.MONTO_DESEMBOLSADO ?? 0;
    this.TIPO_CREDITO = data?.TIPO_CREDITO || "";
    this.FECHA_ULTIMO_PAGO_K = data?.FECHA_ULTIMO_PAGO_K || new Date();
    this.FECHA_ULTIMO_PAGO_I = data?.FECHA_ULTIMO_PAGO_I || new Date();
    this.DIA_PAGO_K = data?.DIA_PAGO_K ?? 0;
    this.DIA_PAGO_I = data?.DIA_PAGO_I ?? 0;
    this.CUOTA_MORA_K = data?.CUOTA_MORA_K ?? 0;
    this.CUOTA_MORA_I = data?.CUOTA_MORA_I ?? 0;
    this.MONTO_CUOTA = data?.MONTO_CUOTA ?? 0;
    this.CUENTA_CONTABLE_K = data?.CUENTA_CONTABLE_K || "";
    this.CUENTA_CONTABLE_I = data?.CUENTA_CONTABLE_I || "";
    this.FECHA_CANCELACION = data?.FECHA_CANCELACION || new Date();
    this.ADELANTO_CAPITAL = data?.ADELANTO_CAPITAL ?? 0;
    this.RIESGO_NETO = data?.RIESGO_NETO ?? 0;
    this.SALDO_SEGURO = data?.SALDO_SEGURO ?? 0;
    this.SALDO_COSTAS_PROCESALES = data?.SALDO_COSTAS_PROCESALES ?? 0;
    this.TIPO_TARJETA_CREDITO = data?.TIPO_TARJETA_CREDITO || "";
    this.CLASE_TARJETA_CREDITO = data?.CLASE_TARJETA_CREDITO || "";
    this.PRODUCTO_TARJETA_CREDITO = data?.PRODUCTO_TARJETA_CREDITO || "";
    this.VALOR_GARANTIA_CONS = data?.VALOR_GARANTIA_CONS ?? 0;
    this.DISTRITO_OTORGAMIENTO = data?.DISTRITO_OTORGAMIENTO || "";
    this.RESERVA_REFERENCIA = data?.RESERVA_REFERENCIA ?? 0;
    this.ETAPA_JUDICIAL = data?.ETAPA_JUDICIAL || "";
    this.FECHA_DEMANDA = data?.FECHA_DEMANDA || new Date();
    this.PLAZO_CREDITO = data?.PLAZO_CREDITO ?? 0;
    this.ORDEN_DESCUENTO = data?.ORDEN_DESCUENTO || "";
    this.CATEGORIA_RIESGO_REF = data?.CATEGORIA_RIESGO_REF || "";
    this.RESERVA_CONSTITUIR = data?.RESERVA_CONSTITUIR ?? 0;
    this.PORCENTAJE_RESERVA = data?.PORCENTAJE_RESERVA ?? 0;
    this.PAGO_CUOTA = data?.PAGO_CUOTA ?? 0;
    this.FECHA_PAGO = data?.FECHA_PAGO || new Date();
    this.PORCENTA_RESERVA_DESCON = data?.PORCENTA_RESERVA_DESCON ?? 0;
    this.PORCENTA_ADICIONA_DESCON = data?.PORCENTA_ADICIONA_DESCON ?? 0;
    this.DEPTO_DESTINO_CREDITO = data?.DEPTO_DESTINO_CREDITO || "";
    this.PORC_RESERVA_REFERENCIA = data?.PORC_RESERVA_REFERENCIA ?? 0;
    this.CALCULO_BRECHA = data?.CALCULO_BRECHA ?? 0;
    this.AJUSTE_BRECHA = data?.AJUSTE_BRECHA ?? 0;
    this.PROGRAMA_ASIST_CAFE = data?.PROGRAMA_ASIST_CAFE || "";
    this.FECHA_CUMP_CAFE = data?.FECHA_CUMP_CAFE || new Date();
  }
}
