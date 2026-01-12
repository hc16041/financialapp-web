import {
  Component,
  ChangeDetectionStrategy,
  inject,
  output,
  input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SavingTransactionType } from "src/app/application/savings/DTO/SavingTransactionDTO";

export interface SavingsFormData {
  date: string;
  amount: number;
  description: string;
  transactionType: SavingTransactionType;
}

/**
 * Componente Dumb para el formulario de transacciones de ahorros
 * Recibe datos via inputs y emite eventos via outputs
 */
@Component({
  selector: "app-savings-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./savings-form.component.html",
  styleUrl: "./savings-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsFormComponent {
  private fb = inject(FormBuilder);

  // Inputs
  loading = input<boolean>(false);

  // Outputs
  submit = output<SavingsFormData>();
  cancel = output<void>();

  // Formulario reactivo tipado
  savingsForm: FormGroup;

  transactionTypes = [
    { value: SavingTransactionType.Deposit, label: "Depósito" },
    { value: SavingTransactionType.Withdrawal, label: "Retiro" },
  ];

  constructor() {
    // Establecer fecha por defecto (hoy)
    const today = new Date().toISOString().split("T")[0];

    this.savingsForm = this.fb.group({
      date: [today, [Validators.required]],
      amount: [
        null,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(999999999.99),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(500),
        ],
      ],
      transactionType: [SavingTransactionType.Deposit, [Validators.required]],
    }) as any;
  }

  private isSubmitting = false;

  onSubmit(event?: Event): void {
    // Prevenir envío múltiple
    if (this.isSubmitting) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if (this.savingsForm.valid) {
      this.isSubmitting = true;
      const formValue = this.savingsForm.value;

      // Validar que todos los campos tienen valores válidos
      if (
        !formValue.date ||
        !formValue.description ||
        formValue.amount === null ||
        formValue.amount === undefined ||
        formValue.transactionType === null ||
        formValue.transactionType === undefined
      ) {
        this.isSubmitting = false;
        return;
      }

      const dataToEmit = {
        date: formValue.date!,
        amount: Number(formValue.amount),
        description: formValue.description!.trim(), // Limpiar espacios en blanco
        transactionType: Number(formValue.transactionType),
      };

      this.submit.emit(dataToEmit);

      // Resetear el flag después de un pequeño delay para permitir que el evento se procese
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.savingsForm.controls).forEach((key) => {
        this.savingsForm.get(key)?.markAsTouched();
      });
    }

    // Prevenir el comportamiento por defecto del formulario
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.savingsForm.reset({
      date: new Date().toISOString().split("T")[0],
      amount: null,
      description: "",
      transactionType: SavingTransactionType.Deposit,
    });
  }

  get isDeposit(): boolean {
    return (
      this.savingsForm.get("transactionType")?.value ===
      SavingTransactionType.Deposit
    );
  }
}
