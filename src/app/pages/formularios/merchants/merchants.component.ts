import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { MerchantsDTO } from "src/app/application/Merchants/DTO/MerchantsDTO";
import { DataService } from "src/app/core/services/data.service";
import { MerchantsService } from "src/app/application/Merchants/Services/Merchants.service";

@Component({
  selector: "app-merchants",
  templateUrl: "./merchants.component.html",
  styleUrl: "./merchants.component.scss",
})
export class MerchantsComponent {
  // Table data
  merchantsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Table data
  merchantsDTO = new MerchantsDTO();

  tableColumns: TableColumn[] = generateTableColumns(this.merchantsDTO);

  constructor(
    private dataService: DataService,
    private merchantService: MerchantsService
  ) {}

  ngOnInit(): void {
    this.obtenerMerchants();
  }

  async obtenerMerchants(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.merchantService,
      "getMerchants",
      this.merchantsList$,
      "Error al cargar comercios"
    );
  }

  async onAddMerchant(newMerchant: any): Promise<void> {
    await this.dataService.agregarRegistro(
      this.merchantService,
      "guardarMerchants",
      newMerchant,
      "Comercio agregado correctamente",
      "Error al agregar comercio"
    );
    await this.obtenerMerchants();
  }
}
