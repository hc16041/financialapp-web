import { Anexo1DTO } from "../DTO/Anexo1DTO";

export interface IAnexo1 {
  getListadoAnexo1(token: string, usuario: string): Promise<Anexo1DTO[]>;
  guardarAnexo1(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo1(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo1(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo1XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo1Excel(token: string, usuario: string): Promise<any>;
}

export interface IAnexo1Edit {
  id: number;
  dependencia_jerarquica: string;
  numero_personal: number;
  organo_gobierno_autorizo: string;
  fecha_aprobacion: Date;
  numero_acta_aprobacion: string;
  cod_usuario: string;
}
