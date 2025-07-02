export interface IAnexo2 {
  getListadoAnexo2(token: string, usuario: string): Promise<any[]>;
  guardarAnexo2(datos: any, token: string, usuario: string): Promise<any>;
  editarAnexo2(datos: any, token: string, usuario: string): Promise<any>;
  eliminarAnexo2(datos: any, token: string, usuario: string): Promise<any>;
  getListadoAnexo2XML(token: string, usuario: string): Promise<any>;
  getListadoAnexo2Excel(token: string, usuario: string): Promise<any>;
}

export interface IAnexo2Edit {
  id: number;
  rol_oficial: number;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  apellido_casada: string;
  titulo_universitario: string;
  nombre_cargo: string;
  lugar_residencia: string;
  tipo_comunicacion: number;
  fecha_efectiva: Date;
  organo_gobierno: string;
  numero_acta_aprobacion: string;
  numero_punto_acta: string;
  fecha_aprobacion: Date;
  correo_electronico: string;
  numero_telefono: string;
  cod_usuario: string;
}
