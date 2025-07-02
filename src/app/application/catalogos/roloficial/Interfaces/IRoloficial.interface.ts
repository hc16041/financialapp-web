import { RoloficialDTO } from "../DTO/RoloficialDTO";

export interface IRoloficial {
  getListadoRoloficial(
    token: string,
    usuario: string
  ): Promise<RoloficialDTO[]>;
}
