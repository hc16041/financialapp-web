import { Injectable, inject, signal, computed } from "@angular/core";
import { CategoriesService } from "src/app/application/categories/Services/Categories.service";
import {
  CategoryDTO,
  CategoryRequest,
  CategoryType,
} from "src/app/application/categories/DTO/CategoryDTO";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";

/**
 * Facade de estado de Categorías con Signals (patrón `savings.facade.ts`).
 * Expone `items`/`loading`/`error` read-only, KPIs `computed` y métodos de
 * mutación que notifican vía `AlertcustomService`.
 */
@Injectable({
  providedIn: "root",
})
export class CategoriesFacade {
  private categoriesService = inject(CategoriesService);
  private alertService = inject(AlertcustomService);

  private _items = signal<CategoryDTO[]>([]);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly total = computed(() => this._items().length);

  readonly incomeCount = computed(
    () => this._items().filter((c) => c.type === CategoryType.Income).length
  );

  readonly expenseCount = computed(
    () => this._items().filter((c) => c.type === CategoryType.Expense).length
  );

  /** Solo las activas, para selectores (ej. Comercios). */
  readonly activeCategories = computed(() =>
    this._items().filter((c) => c.isActive)
  );

  async load(type?: CategoryType, search?: string): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);
      this._items.set(await this.categoriesService.getCategories(type, search));
    } catch (error: unknown) {
      const message = this.toMessage(
        error,
        "No se pudieron cargar las categorías"
      );
      this._error.set(message);
      this.alertService.showError(message);
    } finally {
      this._loading.set(false);
    }
  }

  /** Recarga sin reciclar el estado de `loading` (ya envuelto por el caller). */
  private async refresh(): Promise<void> {
    this._items.set(await this.categoriesService.getCategories());
  }

  async create(datos: CategoryRequest): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);
      await this.categoriesService.create(datos);
      await this.refresh();
      this.alertService.showSuccess("Categoría creada correctamente");
    } catch (error: unknown) {
      this.alertService.showError(
        this.toMessage(error, "Error al crear la categoría")
      );
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  async update(id: number, datos: CategoryRequest): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);
      await this.categoriesService.update(id, datos);
      await this.refresh();
      this.alertService.showSuccess("Categoría actualizada correctamente");
    } catch (error: unknown) {
      this.alertService.showError(
        this.toMessage(error, "Error al actualizar la categoría")
      );
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  async remove(category: CategoryDTO): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);
      await this.categoriesService.delete(category.id);
      await this.refresh();
      this.alertService.showSuccess("Categoría eliminada correctamente");
    } catch (error: unknown) {
      this.alertService.showError(
        this.toMessage(error, "Error al eliminar la categoría")
      );
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  async deactivate(category: CategoryDTO): Promise<void> {
    try {
      this._loading.set(true);
      this._error.set(null);
      await this.categoriesService.deactivate(category);
      await this.refresh();
      this.alertService.showSuccess("Categoría desactivada correctamente");
    } catch (error: unknown) {
      this.alertService.showError(
        this.toMessage(error, "Error al desactivar la categoría")
      );
      throw error;
    } finally {
      this._loading.set(false);
    }
  }

  /** Resuelve el mensaje de error (ProblemDetails `detail`/`title` → `fallback`). */
  toMessage(error: unknown, fallback: string): string {
    const err = error as {
      status?: number;
      error?: { detail?: string; message?: string; title?: string };
      message?: string;
    };
    return (
      err?.error?.detail ||
      err?.error?.message ||
      err?.error?.title ||
      err?.message ||
      fallback
    );
  }
}
