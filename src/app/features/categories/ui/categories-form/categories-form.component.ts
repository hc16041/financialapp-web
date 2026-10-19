import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  effect,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {
  CategoryDTO,
  CategoryRequest,
  CategoryType,
} from "src/app/application/categories/DTO/CategoryDTO";

/**
 * Componente Dumb: formulario reactivo de categoría (crear/editar).
 * Recibe el `category` a editar (o `null` para crear) y emite `submit`/`cancel`.
 */
@Component({
  selector: "app-categories-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: "./categories-form.component.html",
  styleUrl: "./categories-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesFormComponent {
  private fb = inject(FormBuilder);

  loading = input<boolean>(false);
  /** Mensaje de error de servidor/validación (ej. duplicado) a mostrar. */
  errorMessage = input<string>("");
  /** Categoría a editar; `null` para creación. */
  category = input<CategoryDTO | null>(null);

  submit = output<CategoryRequest>();
  cancel = output<void>();

  protected readonly categoryType = CategoryType;

  protected readonly incomeType = CategoryType.Income;
  protected readonly expenseType = CategoryType.Expense;

  protected readonly icons = [
    "mdi-tag",
    "mdi-tag-multiple",
    "mdi-food",
    "mdi-cart",
    "mdi-car",
    "mdi-home",
    "mdi-lightbulb",
    "mdi-medical-bag",
    "mdi-school",
    "mdi-airplane",
    "mdi-cash",
    "mdi-bank",
    "mdi-gift",
    "mdi-paw",
    "mdi-wrench",
    "mdi-gamepad-variant",
  ];

  readonly categoryForm: FormGroup;

  constructor() {
    this.categoryForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
      ],
      type: [CategoryType.Expense, [Validators.required]],
      color: ["var(--fp-primary)", [Validators.maxLength(32)]],
      icon: ["mdi-tag", [Validators.required]],
      isActive: [true],
    });

    effect(() => this.patchFrom(this.category()));
  }

  private patchFrom(category: CategoryDTO | null): void {
    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        type: category.type,
        color: category.color || "var(--fp-primary)",
        icon: category.icon || "mdi-tag",
        isActive: category.isActive,
      });
    } else {
      this.categoryForm.reset({
        name: "",
        type: CategoryType.Expense,
        color: "var(--fp-primary)",
        icon: "mdi-tag",
        isActive: true,
      });
    }
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.categoryForm.invalid) {
      Object.keys(this.categoryForm.controls).forEach((key) =>
        this.categoryForm.get(key)?.markAsTouched()
      );
      return;
    }

    const value = this.categoryForm.value;
    this.submit.emit({
      name: String(value.name).trim(),
      type: Number(value.type) as CategoryType,
      color: String(value.color || "var(--fp-primary)"),
      icon: String(value.icon || "mdi-tag"),
      isActive: Boolean(value.isActive),
    });
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
