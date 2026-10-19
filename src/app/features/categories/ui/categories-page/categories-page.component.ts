import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CategoriesFacade } from "../../data-access/categories.facade";
import { CategoriesListComponent } from "../categories-list/categories-list.component";
import { CategoriesFormComponent } from "../categories-form/categories-form.component";
import { KpiCardComponent } from "src/app/shared/components/kpi-card/kpi-card.component";
import {
  CategoryDTO,
  CategoryRequest,
} from "src/app/application/categories/DTO/CategoryDTO";

/**
 * Componente Smart (container) de Categorías: inyecta `CategoriesFacade`,
 * conserva el estado de pantalla (KPIs + formulario) y delega el render a los
 * componentes Dumb.
 */
@Component({
  selector: "app-categories-page",
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    KpiCardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  templateUrl: "./categories-page.component.html",
  styleUrl: "./categories-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPageComponent implements OnInit {
  private facade = inject(CategoriesFacade);
  private translate = inject(TranslateService);

  readonly items = this.facade.items;
  readonly loading = this.facade.loading;
  readonly error = this.facade.error;
  readonly total = this.facade.total;
  readonly incomeCount = this.facade.incomeCount;
  readonly expenseCount = this.facade.expenseCount;

  readonly showForm = signal<boolean>(false);
  readonly editing = signal<CategoryDTO | null>(null);
  readonly formError = signal<string>("");

  ngOnInit(): void {
    this.facade.load();
  }

  onNew(): void {
    this.editing.set(null);
    this.formError.set("");
    this.showForm.set(true);
  }

  onEdit(category: CategoryDTO): void {
    this.editing.set(category);
    this.formError.set("");
    this.showForm.set(true);
  }

  onCancel(): void {
    this.showForm.set(false);
    this.formError.set("");
  }

  onRetry(): void {
    this.facade.load();
  }

  async onSubmit(data: CategoryRequest): Promise<void> {
    this.formError.set("");
    try {
      const editing = this.editing();
      if (editing) {
        await this.facade.update(editing.id, data);
      } else {
        await this.facade.create(data);
      }
      this.showForm.set(false);
    } catch (error: unknown) {
      this.formError.set(
        this.facade.toMessage(error, this.translate.instant("CATEGORIES.DUPLICATE"))
      );
    }
  }

  async onRemove(category: CategoryDTO): Promise<void> {
    const confirmed = confirm(this.translate.instant("CATEGORIES.CONFIRM_DELETE"));
    if (!confirmed) {
      return;
    }
    try {
      await this.facade.remove(category);
    } catch {
      /* el facade ya notifica el error */
    }
  }

  async onDeactivate(category: CategoryDTO): Promise<void> {
    try {
      await this.facade.deactivate(category);
    } catch {
      /* el facade ya notifica el error */
    }
  }

  async onActivate(category: CategoryDTO): Promise<void> {
    try {
      await this.facade.update(category.id, {
        name: category.name,
        type: category.type,
        color: category.color,
        icon: category.icon,
        isActive: true,
      });
    } catch {
      /* el facade ya notifica el error */
    }
  }
}
