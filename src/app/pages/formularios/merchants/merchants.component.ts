import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from "@angular/core";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private dataService = inject(DataService);
  private merchantService = inject(MerchantsService);

  // Table data - Mantener BehaviorSubject para DataService, pero exponer como signal
  private merchantsList$ = new BehaviorSubject<MerchantsDTO[]>([]);
  private readonly merchantsListSig = signal<MerchantsDTO[]>([]);
  
  get merchantsList(): MerchantsDTO[] {
    return this.merchantsListSig();
  }

  // Table data
  merchantsDTO = new MerchantsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.merchantsDTO);

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el signal
    this.merchantsList$.subscribe(data => {
      this.merchantsListSig.set(data);
    });
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

  async onAddMerchant(newMerchant: MerchantsDTO | Record<string, unknown>): Promise<void> {
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
