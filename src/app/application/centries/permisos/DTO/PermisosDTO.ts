export class PermisosDTO {
  id_permiso: number;
  nombre_permiso: string;

  constructor(data?: Partial<PermisosDTO>) {
    this.id_permiso = data?.id_permiso ?? 0;
    this.nombre_permiso = data?.nombre_permiso || "";
  }
}
