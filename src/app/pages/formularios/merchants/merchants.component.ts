import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  DestroyRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { MerchantsDTO } from "src/app/application/Merchants/DTO/MerchantsDTO";
import { DataService } from "src/app/core/services/data.service";
import { MerchantsService } from "src/app/application/Merchants/Services/Merchants.service";
import { CategoriesService } from "src/app/application/categories/Services/Categories.service";
import { CategoryDTO } from "src/app/application/categories/DTO/CategoryDTO";

/**
 * Mantenimiento de Comercios.
 *
 * Patrón moderno (SPEC-06 §4.7): Signals + `computed`, suscripción con
 * `takeUntilDestroyed`. El `MerchantDto` del backend NO expone un campo de
 * estado activo/inactivo, por lo que el KPI se limita al total de comercios
 * (SPEC-06 §4.5, "si aplica").
 */
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
  private categoriesService = inject(CategoriesService);
  private destroyRef = inject(DestroyRef);

  // Table data - BehaviorSubject para DataService, señal expuesta al template
  private merchantsList$ = new BehaviorSubject<MerchantsDTO[]>([]);
  private readonly merchantsListSig = signal<MerchantsDTO[]>([]);

  // Categorías activas para el selector del formulario (SPEC-09)
  private readonly categoriesSig = signal<CategoryDTO[]>([]);

  /**
   * Opciones del select "category": categorías activas por nombre, más los
   * valores históricos de los comercios que no coincidan, etiquetados "legado".
   */
  readonly selectOptions = computed(() => {
    const active = this.categoriesSig()
      .filter((c) => c.isActive)
      .map((c) => ({ value: c.name, label: c.name }));
    const activeNames = new Set(active.map((o) => o.value));
    const legacy = Array.from(
      new Set(this.merchantsListSig().map((m) => m.category).filter(Boolean))
    )
      .filter((name) => !activeNames.has(name))
      .map((name) => ({ value: name, label: `legado: ${name}` }));

    return { category: [...active, ...legacy] };
  });

  // Estado de carga para skeletons de KPI
  private readonly loadingSig = signal<boolean>(false);
  readonly loading = this.loadingSig.asReadonly();

  // KPI de conteo (SPEC-06 §4.5)
  readonly totalMerchants = computed(() => {
    const list = this.merchantsListSig();
    return list.length === 0 ? null : list.length;
  });

  get merchantsList(): MerchantsDTO[] {
    return this.merchantsListSig();
  }

  // Table data
  merchantsDTO = new MerchantsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.merchantsDTO);

  ngOnInit(): void {
    // Sincronizar el BehaviorSubject con la señal (patrón Signals + takeUntilDestroyed)
    this.merchantsList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.merchantsListSig.set(data);
      });
    this.obtenerMerchants();
    this.obtenerCategorias();
  }

  async obtenerCategorias(): Promise<void> {
    try {
      this.categoriesSig.set(await this.categoriesService.getCategories());
    } catch {
      // Sin categorías: el select conserva el valor histórico del comercio.
    }
  }

  async obtenerMerchants(): Promise<void> {
    this.loadingSig.set(true);
    try {
      await this.dataService.obtenerDatos(
        this.merchantService,
        "getMerchants",
        this.merchantsList$,
        "Error al cargar comercios"
      );
    } finally {
      this.loadingSig.set(false);
    }
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