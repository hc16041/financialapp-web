import { Anexo3DTO } from "../DTO/Anexo3DTO";

export interface IAnexo3 {
  getListadoAnexo3(token: string, usuario: string): Promise<Anexo3DTO[]>;
  guardarAnexo3(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo3(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo3(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo3XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo3Excel(token: string, usuario: string): Promise<any>;
}

export interface IAnexo3Edit {
  id: number;
  periodo_plan: number;
  nombre_responsable_elaboracion: string;
  apellido_responsable_elaboracion: string;
  organo_gobierno: string;
  numero_acta_aprobacion: string;
  numero_punto_acta: string;
  fecha_aprobacion: Date;
  cod_usuario: string;
}
