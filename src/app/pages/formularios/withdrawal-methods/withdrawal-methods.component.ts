import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { WithdrawalMethodsDTO } from "src/app/application/WithdrawalMethods/DTO/WithdrawalMethodsDTO";
import { DataService } from "src/app/core/services/data.service";
import { WithdrawalMethodsService } from "src/app/application/WithdrawalMethods/Services/WithdrawalMethods.service";

@Component({
  selector: "app-withdrawal-methods",
  templateUrl: "./withdrawal-methods.component.html",
  styleUrl: "./withdrawal-methods.component.scss",
})
export class WithdrawalMethodsComponent {
  // Table data
  withdrawalMethodsList$: BehaviorSubject<WithdrawalMethodsDTO[]> = new BehaviorSubject<
    WithdrawalMethodsDTO[]
  >([]);

  // Table data
  withdrawalMethodsDTO = new WithdrawalMethodsDTO();

  tableColumns: TableColumn[] = generateTableColumns(this.withdrawalMethodsDTO);

  constructor(
    private dataService: DataService,
    private withdrawalMethodsService: WithdrawalMethodsService
  ) {}

  ngOnInit(): void {
    this.obtenerWithdrawalMethods();
  }

  async obtenerWithdrawalMethods(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.withdrawalMethodsService,
      "getWithdrawalMethods",
      this.withdrawalMethodsList$,
      "Error al cargar métodos de retiro"
    );
  }

  async onAddWithdrawalMethod(newWithdrawalMethod: any): Promise<void> {
    await this.dataService.agregarRegistro(
      this.withdrawalMethodsService,
      "guardarWithdrawalMethods",
      newWithdrawalMethod,
      "Método de retiro agregado correctamente",
      "Error al agregar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }

  async onEditWithdrawalMethod(updatedWithdrawalMethod: any): Promise<void> {
    await this.dataService.actualizarRegistro(
      this.withdrawalMethodsService,
      "editarWithdrawalMethods",
      updatedWithdrawalMethod,
      "Método de retiro actualizado correctamente",
      "Error al actualizar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }

  async onDeleteWithdrawalMethod(withdrawalMethod: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.withdrawalMethodsService,
      "eliminarWithdrawalMethods",
      withdrawalMethod.id,
      "Método de retiro eliminado correctamente",
      "Error al eliminar método de retiro"
    );
    await this.obtenerWithdrawalMethods();
  }
}

