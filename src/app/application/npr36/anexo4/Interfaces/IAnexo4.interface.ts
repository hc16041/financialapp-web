import { Anexo4DTO } from "../../anexo4/DTO/Anexo4DTO";

export interface IAnexo4 {
  getListadoAnexo4(token: string, usuario: string): Promise<Anexo4DTO[]>;
  guardarAnexo4(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo4(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo4(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo4XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo4Excel(token: string, usuario: string): Promise<any>;
}

export interface IAnexo4Edit {
  id: number;
  correlativo_tema: number;
  tema_capacitacion: string;
  tipo_capacitacion: number;
  mes_ejecucion: number;
  duracion: string;
  nombre_capacitador: string;
  apellido_capacitador: string;
  personal_objetivo: string;
  numero_participantes: number;
  modalidad: number;
  registro_asistencia: number;
  evaluacion: string;
  cod_usuario: string;
}
