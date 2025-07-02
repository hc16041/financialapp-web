import { IsNumber, Min } from "class-validator";

export class Anexo7DTO {
  // Campos originales
  @IsNumber()
  @Min(0, { message: "El SALDO_TOTAL_DEPOSITOS debe ser un número positivo." })
  SALDO_TOTAL_DEPOSITOS: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_DEPOSITOS_AHORRO debe ser un número positivo." })
  SALDO_DEPOSITOS_AHORRO: number;

  @IsNumber()
  @Min(0, {
    message: "El SALDO_DEPOSITOS_CORRIENTE debe ser un número positivo.",
  })
  SALDO_DEPOSITOS_CORRIENTE: number;

  @IsNumber()
  @Min(0, { message: "El SALDO_DEPOSITOS_PLAZOS debe ser un número positivo." })
  SALDO_DEPOSITOS_PLAZOS: number;

  @IsNumber()
  @Min(1, {
    message: "La CANTIDAD_TOTAL_CLIENTES debe ser un número positivo.",
  })
  CANTIDAD_TOTAL_CLIENTES: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_TOTAL_CUENTAS debe ser un número positivo." })
  CANTIDAD_TOTAL_CUENTAS: number;

  @IsNumber()
  @Min(1, {
    message: "La CANTIDAD_CUENTAS_AHORRO debe ser un número positivo.",
  })
  CANTIDAD_CUENTAS_AHORRO: number;

  @IsNumber()
  @Min(1, {
    message: "La CANTIDAD_CUENTAS_CORRIENTE debe ser un número positivo.",
  })
  CANTIDAD_CUENTAS_CORRIENTE: number;

  @IsNumber()
  @Min(1, { message: "La CANTIDAD_CUENTAS_PLAZO debe ser un número positivo." })
  CANTIDAD_CUENTAS_PLAZO: number;

  @IsNumber()
  @Min(1, {
    message: "La CANTIDAD_PERSONAS_NATURALES debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_NATURALES: number;

  @IsNumber()
  @Min(1, {
    message: "La CANTIDAD_PERSONAS_JURIDICAS debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_PRIVADAS debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_PRIVADAS: number;

  // Nuevos campos
  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_DEPOSITANTES_MUJERES debe ser un número positivo.",
  })
  CANTIDAD_DEPOSITANTES_MUJERES: number;

  @IsNumber()
  @Min(0, {
    message: "La CANTIDAD_DEPOSITANTES_HOMBRES debe ser un número positivo.",
  })
  CANTIDAD_DEPOSITANTES_HOMBRES: number;

  @IsNumber()
  @Min(0, {
    message: "El SALDO_TOTAL_DEPOSITANTES_MUJERES debe ser un número positivo.",
  })
  SALDO_TOTAL_DEPOSITANTES_MUJERES: number;

  @IsNumber()
  @Min(0, {
    message: "El SALDO_TOTAL_DEPOSITANTES_HOMBRES debe ser un número positivo.",
  })
  SALDO_TOTAL_DEPOSITANTES_HOMBRES: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_NATURALES_CUENTAS_CORRIENTE debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_NATURALES_CUENTAS_CORRIENTE: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_CORRIENTE debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_CORRIENTE: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_CORRIENTE debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_CORRIENTE: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_NATURALES_CUENTAS_AHORRO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_NATURALES_CUENTAS_AHORRO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_AHORRO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_AHORRO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_AHORRO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_AHORRO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_NATURALES_DEPOSITO_PLAZO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_NATURALES_DEPOSITO_PLAZO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_DEPOSITO_PLAZO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_DEPOSITO_PLAZO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_DEPOSITO_PLAZO debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_DEPOSITO_PLAZO: number;

  @IsNumber()
  @Min(0, {
    message:
      "La CANTIDAD_PERSONAS_CUENTA_AHORRO_SIMPLIFICADA debe ser un número positivo.",
  })
  CANTIDAD_PERSONAS_CUENTA_AHORRO_SIMPLIFICADA: number;

  constructor(data?: Partial<Anexo7DTO>) {
    // Inicialización de campos originales
    this.SALDO_TOTAL_DEPOSITOS = data?.SALDO_TOTAL_DEPOSITOS || 0;
    this.SALDO_DEPOSITOS_AHORRO = data?.SALDO_DEPOSITOS_AHORRO || 0;
    this.SALDO_DEPOSITOS_CORRIENTE = data?.SALDO_DEPOSITOS_CORRIENTE || 0;
    this.SALDO_DEPOSITOS_PLAZOS = data?.SALDO_DEPOSITOS_PLAZOS || 0;
    this.CANTIDAD_TOTAL_CLIENTES = data?.CANTIDAD_TOTAL_CLIENTES || 1;
    this.CANTIDAD_TOTAL_CUENTAS = data?.CANTIDAD_TOTAL_CUENTAS || 1;
    this.CANTIDAD_CUENTAS_AHORRO = data?.CANTIDAD_CUENTAS_AHORRO || 1;
    this.CANTIDAD_CUENTAS_CORRIENTE = data?.CANTIDAD_CUENTAS_CORRIENTE || 1;
    this.CANTIDAD_CUENTAS_PLAZO = data?.CANTIDAD_CUENTAS_PLAZO || 1;
    this.CANTIDAD_PERSONAS_NATURALES = data?.CANTIDAD_PERSONAS_NATURALES || 1;
    this.CANTIDAD_PERSONAS_JURIDICAS = data?.CANTIDAD_PERSONAS_JURIDICAS || 1;
    this.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS =
      data?.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_PRIVADAS =
      data?.CANTIDAD_PERSONAS_JURIDICAS_PRIVADAS || 0;

    // Inicialización de nuevos campos
    this.CANTIDAD_DEPOSITANTES_MUJERES =
      data?.CANTIDAD_DEPOSITANTES_MUJERES || 0;
    this.CANTIDAD_DEPOSITANTES_HOMBRES =
      data?.CANTIDAD_DEPOSITANTES_HOMBRES || 0;
    this.SALDO_TOTAL_DEPOSITANTES_MUJERES =
      data?.SALDO_TOTAL_DEPOSITANTES_MUJERES || 0;
    this.SALDO_TOTAL_DEPOSITANTES_HOMBRES =
      data?.SALDO_TOTAL_DEPOSITANTES_HOMBRES || 0;
    this.CANTIDAD_PERSONAS_NATURALES_CUENTAS_CORRIENTE =
      data?.CANTIDAD_PERSONAS_NATURALES_CUENTAS_CORRIENTE || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_CORRIENTE =
      data?.CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_CORRIENTE || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_CORRIENTE =
      data?.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_CORRIENTE || 0;
    this.CANTIDAD_PERSONAS_NATURALES_CUENTAS_AHORRO =
      data?.CANTIDAD_PERSONAS_NATURALES_CUENTAS_AHORRO || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_AHORRO =
      data?.CANTIDAD_PERSONAS_JURIDICAS_CUENTAS_AHORRO || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_AHORRO =
      data?.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_CUENTAS_AHORRO || 0;
    this.CANTIDAD_PERSONAS_NATURALES_DEPOSITO_PLAZO =
      data?.CANTIDAD_PERSONAS_NATURALES_DEPOSITO_PLAZO || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_DEPOSITO_PLAZO =
      data?.CANTIDAD_PERSONAS_JURIDICAS_DEPOSITO_PLAZO || 0;
    this.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_DEPOSITO_PLAZO =
      data?.CANTIDAD_PERSONAS_JURIDICAS_PUBLICAS_DEPOSITO_PLAZO || 0;
    this.CANTIDAD_PERSONAS_CUENTA_AHORRO_SIMPLIFICADA =
      data?.CANTIDAD_PERSONAS_CUENTA_AHORRO_SIMPLIFICADA || 0;
  }
}
