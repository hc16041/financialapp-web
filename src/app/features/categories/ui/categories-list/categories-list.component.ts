import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {
  CategoryDTO,
  CategoryType,
} from "src/app/application/categories/DTO/CategoryDTO";
import { LoadingSkeletonComponent } from "src/app/shared/components/feedback/loading-skeleton/loading-skeleton.component";
import { EmptyStateComponent } from "src/app/shared/components/feedback/empty-state/empty-state.component";
import { ErrorAlertComponent } from "src/app/shared/components/feedback/error-alert/error-alert.component";

/**
 * Componente Dumb: tabla de categorías con búsqueda y filtro por tipo
 * (ambos en frontend sobre el array ya cargado). Sin dependencias de servicios.
 */
@Component({
  selector: "app-categories-list",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LoadingSkeletonComponent,
    EmptyStateComponent,
    ErrorAlertComponent,
  ],
  templateUrl: "./categories-list.component.html",
  styleUrl: "./categories-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
  items = input.required<CategoryDTO[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  create = output<void>();
  edit = output<CategoryDTO>();
  remove = output<CategoryDTO>();
  deactivate = output<CategoryDTO>();
  activate = output<CategoryDTO>();
  retry = output<void>();

  protected readonly categoryType = CategoryType;

  protected readonly search = signal<string>("");
  protected readonly typeFilter = signal<CategoryType | 0>(0);

  protected readonly filtered = computed<CategoryDTO[]>(() => {
    const term = this.search().trim().toLowerCase();
    const type = this.typeFilter();
    return this.items().filter(
      (c) =>
        (type === 0 || c.type === type) &&
        (term === "" || c.name.toLowerCase().includes(term))
    );
  });

  protected onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected onTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.typeFilter.set(value === "all" ? 0 : (Number(value) as CategoryType));
  }
}
