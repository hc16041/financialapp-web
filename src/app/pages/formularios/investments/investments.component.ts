import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TableColumn } from "../genericos/generictable/table-column.interface";
import { generateTableColumns } from "src/app/utils/table-utils";
import { InvestmentsDTO } from "src/app/application/Investments/DTO/InvestmentsDTO";
import { DataService } from "src/app/core/services/data.service";
import { InvestmentsService } from "src/app/application/Investments/Services/Investments.service";
import { PlatformsService } from "src/app/application/Platforms/Services/Platforms.service";
import { TransactionsService } from "src/app/application/transactions/Services/Transactions.service";
import { WithdrawalMethodsService } from "src/app/application/WithdrawalMethods/Services/WithdrawalMethods.service";
import { CreditcardService } from "src/app/application/creditcard/Services/Creditcard.service";

@Component({
  selector: "app-investments",
  templateUrl: "./investments.component.html",
  styleUrl: "./investments.component.scss",
})
export class InvestmentsComponent {
  // Table data
  investmentsList$: BehaviorSubject<InvestmentsDTO[]> = new BehaviorSubject<
    InvestmentsDTO[]
  >([]);

  // Listados para los selects
  platformsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  transactionTypesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  withdrawalMethodsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  creditCardsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Table data
  investmentsDTO = new InvestmentsDTO();

  tableColumns: TableColumn[] = generateTableColumns(this.investmentsDTO);

  // Select options
  selectOptions: { [key: string]: any[] } = {};

  // Almacenar información de métodos de retiro para identificar cuáles requieren tarjeta
  withdrawalMethodsInfo: Map<
    number,
    { name: string; requiresCreditCard: boolean }
  > = new Map();

  // Almacenar información de tipos de transacción
  transactionTypesInfo: Map<number, { name: string }> = new Map();

  // Campos disabled dinámicamente
  disabledFields: string[] = ["creditCardId"];

  // Campos readonly dinámicamente
  readonlyFields: string[] = ["id", "commission"];

  constructor(
    private dataService: DataService,
    private investmentsService: InvestmentsService,
    private platformsService: PlatformsService,
    private transactionsService: TransactionsService,
    private withdrawalMethodsService: WithdrawalMethodsService,
    private creditcardService: CreditcardService
  ) {}

  ngOnInit(): void {
    this.obtenerInvestments();
    this.obtenerPlatforms();
    this.obtenerTransactionTypes();
    this.obtenerWithdrawalMethods();
    this.obtenerCreditCards();
    this.initializeSelectOptions();
    this.setupSubscriptions();
  }

  private initializeSelectOptions(): void {
    this.selectOptions = {
      platformId: [],
      transactionType: [],
      withdrawalMethod: [],
      creditCardId: [],
    };
  }

  private setupSubscriptions(): void {
    // Suscripciones para actualizar las opciones de los selects cuando cambien los listados
    this.platformsList$.subscribe((platforms) => {
      this.selectOptions = {
        ...this.selectOptions,
        platformId: this.mapPlatforms(platforms),
      };
    });

    this.transactionTypesList$.subscribe((transactionTypes) => {
      // Guardar información de los tipos de transacción
      transactionTypes.forEach((t: any) => {
        this.transactionTypesInfo.set(t.id || t.transactionType, {
          name: t.name || t.description || "",
        });
      });
      this.selectOptions = {
        ...this.selectOptions,
        transactionType: this.mapTransactionTypes(transactionTypes),
      };
    });

    this.withdrawalMethodsList$.subscribe((withdrawalMethods) => {
      // Guardar información de los métodos de retiro
      withdrawalMethods.forEach((w: any) => {
        this.withdrawalMethodsInfo.set(w.id, {
          name: w.name || w.description || "",
          requiresCreditCard: w.requiresCreditCard || false,
        });
      });
      this.selectOptions = {
        ...this.selectOptions,
        withdrawalMethod: this.mapWithdrawalMethods(withdrawalMethods),
      };
    });

    this.creditCardsList$.subscribe((creditCards) => {
      this.selectOptions = {
        ...this.selectOptions,
        creditCardId: this.mapCreditCards(creditCards),
      };
    });
  }

  // Métodos de mapeo para los listados
  private mapPlatforms(platforms: any[]): any[] {
    return platforms.map((p: any) => ({
      value: p.id || p.platformId,
      label: p.name || p.description || `Plataforma ${p.id || p.platformId}`,
    }));
  }

  private mapTransactionTypes(transactionTypes: any[]): any[] {
    // Solo tomar los primeros dos elementos
    return transactionTypes.slice(0, 2).map((t: any) => ({
      value: t.id || t.transactionType,
      label: t.name || t.description || `Tipo ${t.id || t.transactionType}`,
    }));
  }

  private mapWithdrawalMethods(withdrawalMethods: any[]): any[] {
    return withdrawalMethods.map((w: any) => ({
      value: w.id || w.withdrawalMethod,
      label: w.name || w.description || `Método ${w.id || w.withdrawalMethod}`,
    }));
  }

  private mapCreditCards(creditCards: any[]): any[] {
    return creditCards.map((c: any) => ({
      value: c.codigo,
      label: c.descripcion,
    }));
  }

  async obtenerInvestments(): Promise<void> {
    try {
      const data = await this.investmentsService.getInvestments(
        sessionStorage.getItem("authToken") || "",
        sessionStorage.getItem("username") || ""
      );
      console.log(data);
      // Mapear withdrawalMethodId a withdrawalMethod cuando se reciben datos del servidor
      const mappedData = data.map((investment: any) => {
        if (investment.hasOwnProperty("withdrawalMethod")) {
          // Si withdrawalMethodId es un objeto, tomar solo el ID numérico
          const withdrawalMethodId =
            investment.withdrawalMethodId?.id !== undefined
              ? investment.withdrawalMethodId
              : investment.withdrawalMethodId;

          return {
            ...investment,
            withdrawalMethod: withdrawalMethodId,
          };
        }
        return investment;
      });

      this.investmentsList$.next(mappedData);
    } catch (error) {
      console.error("Error al cargar inversiones:", error);
    }
  }

  /**
   * Calcula la comisión según el método de retiro y tipo de transacción
   */
  private calcularComision(
    amount: number,
    withdrawalMethodId: number,
    transactionTypeId: number,
    libreDeComision: boolean = false
  ): number {
    if (libreDeComision || !amount || amount <= 0) {
      return 0;
    }

    // Obtener información del tipo de transacción
    const transactionTypeInfo =
      this.transactionTypesInfo.get(transactionTypeId);
    const transactionTypeName = transactionTypeInfo?.name?.toLowerCase() || "";

    // Si es Purchase (compra)
    if (
      transactionTypeName.includes("purchase") ||
      transactionTypeName.includes("compra")
    ) {
      const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
      if (!methodInfo) {
        return 0;
      }

      const methodName = methodInfo.name.toLowerCase();

      // Si es Purchase con tarjeta: comisión = 0
      if (
        methodInfo.requiresCreditCard ||
        methodName.includes("tarjeta") ||
        methodName.includes("credito") ||
        methodName.includes("card")
      ) {
        return 0;
      }

      // Si es Purchase con bitcoin: no calcular automáticamente
      // El usuario debe ingresar la comisión manualmente
      // Retornar 0 como valor por defecto (el usuario lo cambiará manualmente)
      return 0;
    }

    // Si es Payment: calcular automáticamente según el método de retiro
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    if (!methodInfo) {
      return 0;
    }

    const methodName = methodInfo.name.toLowerCase();

    // Bitcoin: 1% del monto
    if (methodName.includes("bitcoin") || methodName.includes("btc")) {
      return amount * 0.01;
    }

    // Tarjeta de crédito: 2.6% del monto + $1.3 fijo
    if (
      methodInfo.requiresCreditCard ||
      methodName.includes("tarjeta") ||
      methodName.includes("credito") ||
      methodName.includes("card")
    ) {
      return amount * 0.026 + 1.3;
    }

    return 0;
  }

  /**
   * Verifica si un método de retiro requiere tarjeta de crédito
   */
  private requiereTarjeta(withdrawalMethodId: number): boolean {
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    if (!methodInfo) {
      return false;
    }
    const methodName = methodInfo.name.toLowerCase();
    return (
      methodInfo.requiresCreditCard ||
      methodName.includes("tarjeta") ||
      methodName.includes("credito") ||
      methodName.includes("card")
    );
  }

  /**
   * Verifica si un tipo de transacción es Purchase
   */
  private esPurchase(transactionTypeId: number): boolean {
    const transactionTypeInfo =
      this.transactionTypesInfo.get(transactionTypeId);
    if (!transactionTypeInfo) {
      return false;
    }
    const transactionTypeName = transactionTypeInfo.name.toLowerCase();
    return (
      transactionTypeName.includes("purchase") ||
      transactionTypeName.includes("compra")
    );
  }

  /**
   * Verifica si un método de retiro es Bitcoin
   */
  private esBitcoin(withdrawalMethodId: number): boolean {
    const methodInfo = this.withdrawalMethodsInfo.get(withdrawalMethodId);
    if (!methodInfo) {
      return false;
    }
    const methodName = methodInfo.name.toLowerCase();
    return methodName.includes("bitcoin") || methodName.includes("btc");
  }

  /**
   * Maneja los cambios de campo en el formulario
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

  async onAddInvestment(newInvestment: any): Promise<void> {
    console.log("=== INICIO: Agregar Inversión ===");
    console.log(
      "Datos recibidos del formulario:",
      JSON.stringify(newInvestment, null, 2)
    );

    // Calcular comisión según el tipo de transacción
    if (
      !newInvestment.libreDeComision &&
      newInvestment.amount &&
      newInvestment.withdrawalMethod &&
      newInvestment.transactionType
    ) {
      const esPurchase = this.esPurchase(newInvestment.transactionType);
      console.log("Es Purchase?", esPurchase);

      if (esPurchase) {
        // Si es Purchase con tarjeta: comisión = 0
        if (this.requiereTarjeta(newInvestment.withdrawalMethod)) {
          console.log("Purchase con tarjeta - comisión = 0");
          newInvestment.commission = 0;
        } else if (this.esBitcoin(newInvestment.withdrawalMethod)) {
          console.log("Purchase con Bitcoin - mantener comisión manual");
          // Si es Purchase con Bitcoin: mantener el valor ingresado manualmente (o 0 si no se ingresó)
          // No calcular automáticamente
          if (!newInvestment.commission && newInvestment.commission !== 0) {
            newInvestment.commission = 0;
          }
        }
      } else {
        console.log("Es Payment - calcular comisión automáticamente");
        // Si es Payment: calcular automáticamente
        newInvestment.commission = this.calcularComision(
          newInvestment.amount,
          newInvestment.withdrawalMethod,
          newInvestment.transactionType,
          newInvestment.libreDeComision
        );
        console.log("Comisión calculada:", newInvestment.commission);
      }
    } else if (newInvestment.libreDeComision) {
      console.log("Libre de comisión - comisión = 0");
      newInvestment.commission = 0;
    } else if (!newInvestment.commission && newInvestment.commission !== 0) {
      console.log("Sin condiciones especiales - comisión = 0");
      newInvestment.commission = 0;
    }

    // Limpiar creditCardId si no requiere tarjeta
    if (!this.requiereTarjeta(newInvestment.withdrawalMethod)) {
      console.log("No requiere tarjeta - creditCardId = 0");
      newInvestment.creditCardId = 0;
    }

    // Eliminar el campo libreDeComision antes de guardar (es solo para UI)
    const { libreDeComision, ...investmentToSave } = newInvestment;

    // Asegurar que los campos numéricos sean números y no strings
    if (
      investmentToSave.amount !== undefined &&
      investmentToSave.amount !== null
    ) {
      investmentToSave.amount = Number(investmentToSave.amount);
    }
    if (
      investmentToSave.commission !== undefined &&
      investmentToSave.commission !== null
    ) {
      investmentToSave.commission = Number(investmentToSave.commission);
    }
    if (
      investmentToSave.platformId !== undefined &&
      investmentToSave.platformId !== null
    ) {
      investmentToSave.platformId = Number(investmentToSave.platformId);
    }
    if (
      investmentToSave.transactionType !== undefined &&
      investmentToSave.transactionType !== null
    ) {
      investmentToSave.transactionType = Number(
        investmentToSave.transactionType
      );
    }
    if (
      investmentToSave.creditCardId !== undefined &&
      investmentToSave.creditCardId !== null
    ) {
      investmentToSave.creditCardId = Number(investmentToSave.creditCardId);
    }

    // Mapear withdrawalMethod a withdrawalMethodId para la API
    if (investmentToSave.hasOwnProperty("withdrawalMethod")) {
      investmentToSave.withdrawalMethodId = Number(
        investmentToSave.withdrawalMethod
      );
      delete investmentToSave.withdrawalMethod;
    }

    console.log(
      "Datos finales a enviar:",
      JSON.stringify(investmentToSave, null, 2)
    );
    console.log("Tipos de datos:", {
      platformId: typeof investmentToSave.platformId,
      amount: typeof investmentToSave.amount,
      commission: typeof investmentToSave.commission,
      transactionType: typeof investmentToSave.transactionType,
      withdrawalMethodId: typeof investmentToSave.withdrawalMethodId,
      creditCardId: typeof investmentToSave.creditCardId,
      transactionDate: typeof investmentToSave.transactionDate,
    });

    try {
      await this.dataService.agregarRegistro(
        this.investmentsService,
        "guardarInvestments",
        investmentToSave,
        "Inversión agregada correctamente",
        "Error al agregar inversión"
      );
      await this.obtenerInvestments();
      console.log("=== FIN: Inversión agregada exitosamente ===");
    } catch (error) {
      console.error("=== ERROR al agregar inversión ===");
      console.error("Error completo:", error);
      console.error(
        "Stack trace:",
        error instanceof Error ? error.stack : "No stack trace"
      );
      throw error;
    }
  }

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
          // Si es Purchase con Bitcoin: mantener el valor ingresado manualmente (o 0 si no se ingresó)
          // No calcular automáticamente
          if (
            !updatedInvestment.commission &&
            updatedInvestment.commission !== 0
          ) {
            updatedInvestment.commission = 0;
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

    // Eliminar el campo libreDeComision antes de guardar (es solo para UI)
    const { libreDeComision, ...investmentToSave } = updatedInvestment;

    // Asegurar que los campos numéricos sean números y no strings
    if (
      investmentToSave.amount !== undefined &&
      investmentToSave.amount !== null
    ) {
      investmentToSave.amount = Number(investmentToSave.amount);
    }
    if (
      investmentToSave.commission !== undefined &&
      investmentToSave.commission !== null
    ) {
      investmentToSave.commission = Number(investmentToSave.commission);
    }
    if (
      investmentToSave.platformId !== undefined &&
      investmentToSave.platformId !== null
    ) {
      investmentToSave.platformId = Number(investmentToSave.platformId);
    }
    if (
      investmentToSave.transactionType !== undefined &&
      investmentToSave.transactionType !== null
    ) {
      investmentToSave.transactionType = Number(
        investmentToSave.transactionType
      );
    }
    if (
      investmentToSave.creditCardId !== undefined &&
      investmentToSave.creditCardId !== null
    ) {
      investmentToSave.creditCardId = Number(investmentToSave.creditCardId);
    }

    // Mapear withdrawalMethod a withdrawalMethodId para la API
    if (investmentToSave.hasOwnProperty("withdrawalMethod")) {
      investmentToSave.withdrawalMethodId = Number(
        investmentToSave.withdrawalMethod
      );
      delete investmentToSave.withdrawalMethod;
    }

    await this.dataService.actualizarRegistro(
      this.investmentsService,
      "editarInvestments",
      investmentToSave,
      "Inversión actualizada correctamente",
      "Error al actualizar inversión"
    );
    await this.obtenerInvestments();
  }

  async onDeleteInvestment(investment: any): Promise<void> {
    await this.dataService.eliminarRegistro(
      this.investmentsService,
      "eliminarInvestments",
      investment.id,
      "Inversión eliminada correctamente",
      "Error al eliminar inversión"
    );
    await this.obtenerInvestments();
  }

  async obtenerPlatforms(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.platformsService,
      "getPlatforms",
      this.platformsList$,
      "Error al cargar plataformas"
    );
  }

  async obtenerTransactionTypes(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.transactionsService,
      "getTransactionTypes",
      this.transactionTypesList$,
      "Error al cargar tipos de transacción"
    );
  }

  async obtenerWithdrawalMethods(): Promise<void> {
    return this.dataService.obtenerDatos(
      this.withdrawalMethodsService,
      "getWithdrawalMethods",
      this.withdrawalMethodsList$,
      "Error al cargar métodos de retiro"
    );
  }

  async obtenerCreditCards(): Promise<void> {
    // getCreditCardCodes solo recibe token, no usuario
    try {
      const token = sessionStorage.getItem("authToken") || "";
      const data = await this.creditcardService.getCreditCardCodes(token);
      this.creditCardsList$.next(data);
    } catch (error) {
      console.error("Error al cargar tarjetas de crédito:", error);
    }
  }
}
