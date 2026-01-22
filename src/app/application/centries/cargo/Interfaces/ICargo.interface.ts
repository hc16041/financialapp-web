import { CargoDTO } from "../DTO/CargoDTO";
import { CargoOperationResponse } from "../DTO/CargoOperation.dto";

export interface ICargo {
  getListadoCargo(token: string): Promise<CargoDTO[]>;
  getListadoCargoId(idcargo: number, token: string): Promise<CargoDTO>;
  guardarCargo(datos: CargoDTO | Record<string, unknown>, token: string): Promise<CargoOperationResponse>;
  editarCargo(datos: CargoDTO | Record<string, unknown>, token: string): Promise<CargoOperationResponse>;
  eliminarCargo(datos: CargoDTO | Record<string, unknown>, token: string): Promise<CargoOperationResponse>;
}
