import { Component, inject } from "@angular/core";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { InvestmentsDTO } from "src/app/application/Investments/DTO/InvestmentsDTO";
import { InvestmentsFacade } from "src/app/modules/investments/services/investments.facade";
import {
  CommissionCalculationService,
  WithdrawalMethodInfo,
  TransactionTypeInfo,
} from "src/app/core/services/commission-calculation.service";

@Component({
  selector: "app-investments",
  templateUrl: "./investments.component.html",
  styleUrl: "./investments.component.scss",
})
export class InvestmentsComponent {
  // Inyectar Facade y servicio de cálculo de comisiones
  private investmentsFacade = inject(InvestmentsFacade);
  private commissionCalculationService = inject(CommissionCalculationService);

  // Exponer BehaviorSubjects del Facade para uso en template
  investmentsList$ = this.investmentsFacade.investmentsList$;
  platformsList$ = this.investmentsFacade.platformsList$;
  transactionTypesList$ = this.investmentsFacade.transactionTypesList$;
  withdrawalMethodsList$ = this.investmentsFacade.withdrawalMethodsList$;
  creditCardsList$ = this.investmentsFacade.creditCardsList$;

  // Exponer selectOptions del Facade
  get selectOptions(): { [key: string]: any[] } {
    return this.investmentsFacade.selectOptions;
  }

  // Exponer Maps del Facade para cálculos
  get withdrawalMethodsInfo() {
    return this.investmentsFacade.withdrawalMethodsInfo;
  }

  get transactionTypesInfo() {
    return this.investmentsFacade.transactionTypesInfo;
  }

  // Table data
  investmentsDTO = new InvestmentsDTO();
  tableColumns: TableColumn[] = generateTableColumns(this.investmentsDTO);

  // Campos disabled dinámicamente
  disabledFields: string[] = ["creditCardId"];

  // Campos readonly dinámicamente
  readonlyFields: string[] = ["id", "commission"];

  /**
   * Inicializa la vista solicitando todos los catálogos y datos de inversiones.
   */
  ngOnInit(): void {
    // Inicializar el Facade que carga todos los datos necesarios
    this.investmentsFacade.initialize();
  }

  /**
   * Calcula la comisión según el método de retiro y tipo de transacción
   * Delega al servicio de cálculo de comisiones.
   *
   * @param amount Monto de la inversión.
   * @param withdrawalMethodId Método de retiro seleccionado.
   * @param transactionTypeId Tipo de transacción seleccionado.
   * @param libreDeComision Si está libre de comisión (default `false`).
   * @returns Comisión calculada.
   */
  private calcularComision(
    amount: number,
    withdrawalMethodId: number,
    transactionTypeId: number,
    libreDeComision: boolean = false
  ): number {
    // Obtener información del tipo de transacción
    const transactionTypeInfo =
      this.transactionTypesInfo.get(transactionTypeId);
    const transactionType: TransactionTypeInfo | undefined = transactionTypeInfo
      ? {
          id: transactionTypeId,
          name: transactionTypeInfo.name,
        }
      : undefined;

    // Obtener información del método de retiro
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    const withdrawalMethod: WithdrawalMethodInfo | undefined = methodInfo
      ? {
          id: withdrawalMethodId,
          name: methodInfo.name,
          requiresCreditCard: methodInfo.requiresCreditCard,
        }
      : undefined;

    const result = this.commissionCalculationService.calculateCommission(
      {
        amount,
        withdrawalMethodId,
        transactionTypeId,
        libreDeComision,
      },
      withdrawalMethod,
      transactionType
    );

    return result.commission;
  }

  /**
   * Verifica si un método de retiro requiere tarjeta de crédito
   * Delega al Facade.
   * @param withdrawalMethodId Id del método.
   * @returns `true` si requiere tarjeta.
   */
  private requiereTarjeta(withdrawalMethodId: number): boolean {
    return this.investmentsFacade.requiresCreditCard(withdrawalMethodId);
  }

  /**
   * Verifica si un tipo de transacción es Purchase
   * Delega al Facade.
   * @param transactionTypeId Id del tipo.
   * @returns `true` si es Purchase.
   */
  private esPurchase(transactionTypeId: number): boolean {
    return this.investmentsFacade.isPurchase(transactionTypeId);
  }

  /**
   * Verifica si un método de retiro es Bitcoin
   * Delega al Facade.
   * @param withdrawalMethodId Id del método.
   * @returns `true` si es Bitcoin.
   */
  private esBitcoin(withdrawalMethodId: number): boolean {
    return this.investmentsFacade.isBitcoin(withdrawalMethodId);
  }

  /**
   * Maneja los cambios de campo en el formulario
   * @param change Evento emitido por el formulario con campo y valor.
   */
  onFieldChange(change: { field: string; value: any }): void {
    // Cuando cambia withdrawalMethod, actualizar disabledFields
    if (change.field === "withdrawalMethod") {
      const requiereTarjeta = this.requiereTarjeta(change.value);
      if (requiereTarjeta) {
        // Habilitar creditCardId - crear nuevo array para forzar detección de cambios
        this.disabledFields = this.disabledFields.filter(
          (f) => f !== "creditCardId"
        );
      } else {
        // Deshabilitar creditCardId y limpiar su valor
        if (!this.disabledFields.includes("creditCardId")) {
          this.disabledFields = [...this.disabledFields, "creditCardId"];
        }
      }
    }

    // Cuando cambia transactionType, actualizar readonlyFields para commission
    // Nota: El modal emitirá otro evento cuando cambie withdrawalMethod si es necesario
    if (change.field === "transactionType") {
      // Inicializar readonlyFields con el valor por defecto
      // El modal manejará la actualización cuando también cambie withdrawalMethod
      this.readonlyFields = ["id", "commission"];
    }
  }

  /**
   * Actualiza los campos readonly según el tipo de transacción y método de retiro
   * @param transactionTypeId Tipo de transacción seleccionado.
   * @param withdrawalMethodId Método de retiro seleccionado.
   */
  private updateReadonlyFields(
    transactionTypeId: number | null,
    withdrawalMethodId: number | null
  ): void {
    if (!transactionTypeId) {
      this.readonlyFields = ["id", "commission"];
      return;
    }

    const esPurchase = this.esPurchase(transactionTypeId);

    if (esPurchase && withdrawalMethodId) {
      const esBitcoin = this.esBitcoin(withdrawalMethodId);
      // Si es Purchase con Bitcoin: habilitar campo commission (quitar de readonly)
      if (esBitcoin) {
        this.readonlyFields = this.readonlyFields.filter(
          (f) => f !== "commission"
        );
      } else {
        // Si es Purchase con tarjeta: commission sigue siendo readonly (será 0)
        if (!this.readonlyFields.includes("commission")) {
          this.readonlyFields = [...this.readonlyFields, "commission"];
        }
      }
    } else {
      // Si es Payment: commission es readonly (se calcula automáticamente)
      if (!this.readonlyFields.includes("commission")) {
        this.readonlyFields = [...this.readonlyFields, "commission"];
      }
    }
  }

  /**
   * Crea una inversión aplicando las reglas de comisión y delegando en el Facade.
   * @param newInvestment Datos del formulario/modal.
   */
  async onAddInvestment(newInvestment: any): Promise<void> {
    // Calcular comisión según el tipo de transacción
    if (
      !newInvestment.libreDeComision &&
      newInvestment.amount &&
      newInvestment.withdrawalMethod &&
      newInvestment.transactionType
    ) {
      const esPurchase = this.esPurchase(newInvestment.transactionType);

      if (esPurchase) {
        // Si es Purchase con tarjeta: comisión = 0
        if (this.requiereTarjeta(newInvestment.withdrawalMethod)) {
          newInvestment.commission = 0;
        } else if (this.esBitcoin(newInvestment.withdrawalMethod)) {
          // Si es Purchase con Bitcoin: usar el servicio para determinar si debe calcularse
          const transactionTypeInfo = this.transactionTypesInfo.get(
            newInvestment.transactionType
          );
          const methodInfo = this.withdrawalMethodsInfo.get(
            newInvestment.withdrawalMethod
          );

          if (transactionTypeInfo && methodInfo) {
            const result =
              this.commissionCalculationService.calculateCommission(
                {
                  amount: newInvestment.amount,
                  withdrawalMethodId: newInvestment.withdrawalMethod,
                  transactionTypeId: newInvestment.transactionType,
                  libreDeComision: newInvestment.libreDeComision,
                },
                {
                  id: newInvestment.withdrawalMethod,
                  name: methodInfo.name,
                  requiresCreditCard: methodInfo.requiresCreditCard,
                },
                {
                  id: newInvestment.transactionType,
                  name: transactionTypeInfo.name,
                }
              );

            // Si no debe calcularse automáticamente, mantener el valor actual o 0
            if (!result.shouldCalculateAutomatically) {
              if (!newInvestment.commission && newInvestment.commission !== 0) {
                newInvestment.commission = 0;
              }
            } else {
              newInvestment.commission = result.commission;
            }
          } else {
            // Fallback: mantener valor actual o 0
            if (!newInvestment.commission && newInvestment.commission !== 0) {
              newInvestment.commission = 0;
            }
          }
        }
      } else {
        // Si es Payment: calcular automáticamente
        newInvestment.commission = this.calcularComision(
          newInvestment.amount,
          newInvestment.withdrawalMethod,
          newInvestment.transactionType,
          newInvestment.libreDeComision
        );
      }
    } else if (newInvestment.libreDeComision) {
      newInvestment.commission = 0;
    } else if (!newInvestment.commission && newInvestment.commission !== 0) {
      newInvestment.commission = 0;
    }

    // Limpiar creditCardId si no requiere tarjeta
    if (!this.requiereTarjeta(newInvestment.withdrawalMethod)) {
      newInvestment.creditCardId = 0;
    }

    try {
      // Usar el Facade para agregar la inversión (el Facade maneja la transformación)
      await this.investmentsFacade.addInvestment(newInvestment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edita una inversión aplicando las reglas de comisión y delegando en el Facade.
   * @param updatedInvestment Datos editados del formulario/modal.
   */
  async onEditInvestment(updatedInvestment: any): Promise<void> {
    // Calcular comisión según el tipo de transacción
    if (
      !updatedInvestment.libreDeComision &&
      updatedInvestment.amount &&
      updatedInvestment.withdrawalMethod &&
      updatedInvestment.transactionType
    ) {
      const esPurchase = this.esPurchase(updatedInvestment.transactionType);

      if (esPurchase) {
        // Si es Purchase con tarjeta: comisión = 0
        if (this.requiereTarjeta(updatedInvestment.withdrawalMethod)) {
          updatedInvestment.commission = 0;
        } else if (this.esBitcoin(updatedInvestment.withdrawalMethod)) {
          // Si es Purchase con Bitcoin: usar el servicio para determinar si debe calcularse
          const transactionTypeInfo = this.transactionTypesInfo.get(
            updatedInvestment.transactionType
          );
          const methodInfo = this.withdrawalMethodsInfo.get(
            updatedInvestment.withdrawalMethod
          );

          if (transactionTypeInfo && methodInfo) {
            const result =
              this.commissionCalculationService.calculateCommission(
                {
                  amount: updatedInvestment.amount,
                  withdrawalMethodId: updatedInvestment.withdrawalMethod,
                  transactionTypeId: updatedInvestment.transactionType,
                  libreDeComision: updatedInvestment.libreDeComision,
                },
                {
                  id: updatedInvestment.withdrawalMethod,
                  name: methodInfo.name,
                  requiresCreditCard: methodInfo.requiresCreditCard,
                },
                {
                  id: updatedInvestment.transactionType,
                  name: transactionTypeInfo.name,
                }
              );

            // Si no debe calcularse automáticamente, mantener el valor actual o 0
            if (!result.shouldCalculateAutomatically) {
              if (
                !updatedInvestment.commission &&
                updatedInvestment.commission !== 0
              ) {
                updatedInvestment.commission = 0;
              }
            } else {
              updatedInvestment.commission = result.commission;
            }
          } else {
            // Fallback: mantener valor actual o 0
            if (
              !updatedInvestment.commission &&
              updatedInvestment.commission !== 0
            ) {
              updatedInvestment.commission = 0;
            }
          }
        }
      } else {
        // Si es Payment: calcular automáticamente
        updatedInvestment.commission = this.calcularComision(
          updatedInvestment.amount,
          updatedInvestment.withdrawalMethod,
          updatedInvestment.transactionType,
          updatedInvestment.libreDeComision
        );
      }
    } else if (updatedInvestment.libreDeComision) {
      updatedInvestment.commission = 0;
    } else if (
      !updatedInvestment.commission &&
      updatedInvestment.commission !== 0
    ) {
      updatedInvestment.commission = 0;
    }

    // Limpiar creditCardId si no requiere tarjeta
    if (!this.requiereTarjeta(updatedInvestment.withdrawalMethod)) {
      updatedInvestment.creditCardId = 0;
    }

    // Usar el Facade para actualizar la inversión (el Facade maneja la transformación)
    await this.investmentsFacade.updateInvestment(updatedInvestment);
  }

  /**
   * Elimina una inversión por id a través del Facade.
   * @param investment Entidad seleccionada a eliminar.
   */
  async onDeleteInvestment(investment: any): Promise<void> {
    // Usar el Facade para eliminar la inversión
    await this.investmentsFacade.deleteInvestment(investment.id);
  }

  /**
   * Maneja la búsqueda por rango de fechas
   * @param dateRange Rango de fechas seleccionado.
   */
  async onDateRangeSearch(dateRange: {
    startDate: string;
    endDate: string;
  }): Promise<void> {
    // Si las fechas están vacías, establecer fechas por defecto
    let startDate = dateRange.startDate;
    let endDate = dateRange.endDate;

    if (!startDate || !endDate) {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Formatear fechas al formato YYYY-MM-DD
      const formatDateForInput = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      startDate = formatDateForInput(firstDayOfMonth);
      endDate = formatDateForInput(lastDayOfMonth);
    }

    await this.investmentsFacade.loadInvestmentsByDateRange(startDate, endDate);
  }
}
