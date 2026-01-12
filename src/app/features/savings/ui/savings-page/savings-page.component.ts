import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { SavingsFacade } from "../../data-access/savings.facade";
import { SavingsFormComponent, SavingsFormData } from "../savings-form/savings-form.component";
import { SavingsListComponent } from "../savings-list/savings-list.component";
import { SavingTransactionType } from "src/app/application/savings/DTO/SavingTransactionDTO";

/**
 * Componente Smart (Page/Container) que orquesta la vista de ahorros
 * Inyecta el Facade y pasa datos a los componentes Dumb via signals
 */
@Component({
  selector: "app-savings-page",
  standalone: true,
  imports: [CommonModule, SavingsFormComponent, SavingsListComponent],
  templateUrl: "./savings-page.component.html",
  styleUrl: "./savings-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsPageComponent implements OnInit {
  private savingsFacade = inject(SavingsFacade);

  // Exponer signals del facade como read-only
  readonly balance = this.savingsFacade.balance;
  readonly transactions = this.savingsFacade.transactions;
  readonly loading = this.savingsFacade.loading;
  readonly error = this.savingsFacade.error;

  // Estado local para mostrar/ocultar formulario
  readonly showForm = signal<boolean>(false);

  ngOnInit(): void {
    // Inicializar cargando balance e historial
    this.savingsFacade.initialize();
  }

  async onFormSubmit(formData: SavingsFormData): Promise<void> {
    // Validar que formData existe y tiene los datos necesarios
    if (!formData || !formData.date || !formData.description || formData.amount === undefined || formData.transactionType === undefined) {
      return;
    }

    try {
      await this.savingsFacade.registerTransaction(
        formData.date,
        formData.amount,
        formData.description,
        formData.transactionType as SavingTransactionType
      );
      // Ocultar formulario después de guardar exitosamente
      this.showForm.set(false);
    } catch (error) {
      // El error ya se maneja en el facade
      console.error("Error al registrar transacción:", error);
    }
  }

  onFormCancel(): void {
    this.showForm.set(false);
  }

  toggleForm(): void {
    this.showForm.update((value) => !value);
  }
}
