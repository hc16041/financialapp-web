export interface LoginRequest {
  usuario: string;
  clave: string;
  mac_addres: string;
}

export interface LoginResponse {
  token?: string;
  respuesta: string;
}

export interface LoginDTO {
  id: number;
  usuario: string;
  mac_addres: string;
  codigo_vendedor: string;
  cambio_contrasena: number;
  nom_colaborador: string;
  cargo: string;
  botones: any[];
  permisos: PermisosDTO[];
  expiracion: Date;
}

export interface PermisosDTO {
  // Define aquí la estructura de los permisos si la tienes
  perfil: string;
  nombre_permiso: string;
}
