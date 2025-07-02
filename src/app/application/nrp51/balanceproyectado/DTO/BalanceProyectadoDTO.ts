import { IsNumber, IsString, Min } from "class-validator";

export class BalanceProyectadoDTO {
  @IsString()
  @Min(1, { message: "El ID_CODIGO_CUENTAPROY debe tener 10 caracteres." })
  ID_CODIGO_CUENTAPROY: string;

  @IsString()
  @Min(1, { message: "El NOM_CUENTAPROY debe tener 10 caracteres." })
  NOM_CUENTAPROY: string;

  @IsNumber()
  @Min(0, { message: "El mes ENERO debe ser un número positivo." }) 
  ENERO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes FEBRERO debe ser un número positivo." }) 
  FEBRERO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes MARZO debe ser un número positivo." }) 
  MARZO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes ABRIL debe ser un número positivo." }) 
  ABRIL: number;
  
  @IsNumber()
  @Min(0, { message: "El mes MAYO debe ser un número positivo." }) 
  MAYO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes JUNIO debe ser un número positivo." }) 
  JUNIO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes JULIO debe ser un número positivo." }) 
  JULIO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes AGOSTO debe ser un número positivo." }) 
  AGOSTO: number;
  
  @IsNumber()
  @Min(0, { message: "El mes SEPTIEMBRE debe ser un número positivo." }) 
  SEPTIEMBRE: number;
  
  @IsNumber()
  @Min(0, { message: "El mes OCTUBRE debe ser un número positivo." }) 
  OCTUBRE: number;
  
  @IsNumber()
  @Min(0, { message: "El mes NOVIEMBRE debe ser un número positivo." }) 
  NOVIEMBRE: number;
  
  @IsNumber()
  @Min(0, { message: "El mes DICIEMBRE debe ser un número positivo." }) 
  DICIEMBRE: number;



  constructor(data?: Partial<BalanceProyectadoDTO>) {
    this.ID_CODIGO_CUENTAPROY = data?.ID_CODIGO_CUENTAPROY || "";
    this.NOM_CUENTAPROY = data?.NOM_CUENTAPROY || "";
    this.ENERO = data?.ENERO || 0;
    this.FEBRERO = data?.FEBRERO || 0;
    this.MARZO = data?.MARZO || 0;
    this.ABRIL = data?.ABRIL || 0;
    this.MAYO = data?.MAYO || 0;
    this.JUNIO = data?.JUNIO || 0;
    this.JULIO = data?.JULIO || 0;
    this.AGOSTO = data?.AGOSTO || 0;
    this.SEPTIEMBRE = data?.SEPTIEMBRE || 0;
    this.OCTUBRE = data?.OCTUBRE || 0;
    this.NOVIEMBRE = data?.NOVIEMBRE || 0;
    this.DICIEMBRE = data?.DICIEMBRE || 0;
  }
}
