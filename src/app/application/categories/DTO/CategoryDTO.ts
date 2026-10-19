export enum CategoryType {
  Income = 1,
  Expense = 2,
}

/**
 * Categoría del usuario (SPEC-09). Contrato real de `api/Categories`
 * (`CategoryDto` del backend): `type` 1=Ingreso, 2=Gasto.
 */
export class CategoryDTO {
  id = 0;
  name = "";
  type: CategoryType = CategoryType.Expense;
  typeName = "";
  color = "var(--fp-primary)";
  icon = "mdi-tag";
  isActive = true;

  constructor(data?: Partial<CategoryDTO>) {
    Object.assign(this, data);
  }
}

/** Cuerpo de creación/actualización (`CreateCategoryDto` / `UpdateCategoryCommand`). */
export interface CategoryRequest {
  name: string;
  type: CategoryType;
  color: string;
  icon: string;
  isActive: boolean;
}
