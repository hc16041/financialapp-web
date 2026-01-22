import { Injectable } from "@angular/core";

/**
 * Información del método de retiro necesaria para el cálculo
 */
export interface WithdrawalMethodInfo {
  id: number;
  name: string;
  requiresCreditCard: boolean;
}

/**
 * Información del tipo de transacción necesaria para el cálculo
 */
export interface TransactionTypeInfo {
  id: number;
  name: string;
}

/**
 * Parámetros para el cálculo de comisión
 */
export interface CommissionCalculationParams {
  amount: number;
  withdrawalMethodId: number;
  transactionTypeId: number;
  libreDeComision: boolean;
  withdrawalMethodInfo?: WithdrawalMethodInfo;
  transactionTypeInfo?: TransactionTypeInfo;
}

/**
 * Resultado del cálculo de comisión
 */
export interface CommissionCalculationResult {
  commission: number;
  shouldCalculateAutomatically: boolean; // Si es false, el usuario debe ingresar manualmente
}

/**
 * Servicio para calcular comisiones de inversiones
 * 
 * Reglas de negocio:
 * - Purchase (compra) + Tarjeta: comisión = 0
 * - Purchase (compra) + Bitcoin: no calcular automáticamente (usuario ingresa manualmente)
 * - Payment + Bitcoin: 1% del monto
 * - Payment + Tarjeta: 2.6% del monto + $1.30 fijo
 * - libreDeComision = true: comisión = 0 siempre
 */
@Injectable({
  providedIn: "root",
})
export class CommissionCalculationService {
  /**
   * Calcula la comisión según las reglas de negocio
   * 
   * @param params Parámetros del cálculo
   * @param withdrawalMethodInfo Información del método de retiro (opcional, se puede inferir del ID)
   * @param transactionTypeInfo Información del tipo de transacción (opcional, se puede inferir del ID)
   * @returns Resultado del cálculo con la comisión y si debe calcularse automáticamente
   */
  calculateCommission(
    params: CommissionCalculationParams,
    withdrawalMethodInfo?: WithdrawalMethodInfo,
    transactionTypeInfo?: TransactionTypeInfo
  ): CommissionCalculationResult {
    const {
      amount,
      withdrawalMethodId,
      transactionTypeId,
      libreDeComision,
    } = params;

    // Si está libre de comisión o el monto es inválido, retornar 0
    if (libreDeComision || !amount || amount <= 0 || !withdrawalMethodId || !transactionTypeId) {
      return {
        commission: 0,
        shouldCalculateAutomatically: true,
      };
    }

    // Obtener información del tipo de transacción
    const transactionType = transactionTypeInfo || this.getTransactionTypeInfo(transactionTypeId);
    if (!transactionType) {
      return {
        commission: 0,
        shouldCalculateAutomatically: true,
      };
    }

    const transactionTypeName = transactionType.name.toLowerCase();
    const esPurchase =
      transactionTypeName.includes("purchase") ||
      transactionTypeName.includes("compra");

    // Obtener información del método de retiro
    const withdrawalMethod = withdrawalMethodInfo || this.getWithdrawalMethodInfo(withdrawalMethodId);
    if (!withdrawalMethod) {
      return {
        commission: 0,
        shouldCalculateAutomatically: true,
      };
    }

    const methodName = withdrawalMethod.name.toLowerCase();
    const esTarjeta = this.isCreditCardMethod(withdrawalMethod, methodName);
    const esBitcoin = this.isBitcoinMethod(methodName);

    // Si es Purchase (compra)
    if (esPurchase) {
      // Purchase con tarjeta: comisión = 0
      if (esTarjeta) {
        return {
          commission: 0,
          shouldCalculateAutomatically: true,
        };
      }

      // Purchase con Bitcoin: NO calcular automáticamente
      // El usuario debe ingresar la comisión manualmente
      if (esBitcoin) {
        return {
          commission: 0, // Valor por defecto, pero no se calcula automáticamente
          shouldCalculateAutomatically: false,
        };
      }

      // Por defecto para Purchase, comisión 0
      return {
        commission: 0,
        shouldCalculateAutomatically: true,
      };
    }

    // Si es Payment: calcular automáticamente según el método de retiro
    // Bitcoin: 1% del monto
    if (esBitcoin) {
      return {
        commission: amount * 0.01,
        shouldCalculateAutomatically: true,
      };
    }

    // Tarjeta de crédito: 2.6% del monto + $1.30 fijo
    if (esTarjeta) {
      return {
        commission: amount * 0.026 + 1.3,
        shouldCalculateAutomatically: true,
      };
    }

    // Por defecto, comisión 0
    return {
      commission: 0,
      shouldCalculateAutomatically: true,
    };
  }

  /**
   * Calcula la comisión usando información desde selectOptions (para uso en modales)
   * 
   * @param amount Monto de la inversión
   * @param withdrawalMethodId ID del método de retiro
   * @param transactionTypeId ID del tipo de transacción
   * @param libreDeComision Si está libre de comisión
   * @param selectOptions Opciones de select del formulario
   * @param currentCommission Comisión actual (para Purchase + Bitcoin, mantener valor)
   * @returns Comisión calculada
   */
  calculateCommissionFromSelectOptions(
    amount: number,
    withdrawalMethodId: number,
    transactionTypeId: number,
    libreDeComision: boolean,
    selectOptions: { [key: string]: unknown[] },
    currentCommission?: number
  ): number {
    const params: CommissionCalculationParams = {
      amount,
      withdrawalMethodId,
      transactionTypeId,
      libreDeComision,
    };

    // Obtener información desde selectOptions
    const transactionTypeOptions = selectOptions["transactionType"] || [];
    const transactionTypeOption = transactionTypeOptions.find(
      (opt: unknown) => (opt as Record<string, unknown>)['value'] === transactionTypeId
    ) as Record<string, unknown> | undefined;

    const withdrawalMethodOptions = selectOptions["withdrawalMethod"] || [];
    const withdrawalMethodOption = withdrawalMethodOptions.find(
      (opt: unknown) => (opt as Record<string, unknown>)['value'] === withdrawalMethodId
    ) as Record<string, unknown> | undefined;

    if (!transactionTypeOption || !withdrawalMethodOption) {
      return 0;
    }

    const transactionTypeInfo: TransactionTypeInfo = {
      id: transactionTypeId,
      name: (transactionTypeOption['label'] as string) || "",
    };

    // Intentar obtener requiresCreditCard desde la opción o inferirlo
    const methodName = ((withdrawalMethodOption['label'] as string) || "").toLowerCase();
    const requiresCreditCard =
      withdrawalMethodOption['requiresCreditCard'] !== undefined
        ? (withdrawalMethodOption['requiresCreditCard'] as boolean)
        : this.isCreditCardMethodByName(methodName);

    const withdrawalMethodInfo: WithdrawalMethodInfo = {
      id: withdrawalMethodId,
      name: (withdrawalMethodOption['label'] as string) || "",
      requiresCreditCard,
    };

    const result = this.calculateCommission(
      params,
      withdrawalMethodInfo,
      transactionTypeInfo
    );

    // Si es Purchase + Bitcoin y hay un valor actual, mantenerlo
    if (!result.shouldCalculateAutomatically && currentCommission !== undefined && currentCommission !== null) {
      return currentCommission;
    }

    return result.commission;
  }

  /**
   * Verifica si un método de retiro es tarjeta de crédito
   */
  private isCreditCardMethod(
    method: WithdrawalMethodInfo,
    methodName: string
  ): boolean {
    return (
      method.requiresCreditCard ||
      methodName.includes("tarjeta") ||
      methodName.includes("credito") ||
      methodName.includes("card")
    );
  }

  /**
   * Verifica si un nombre de método es tarjeta de crédito
   */
  private isCreditCardMethodByName(methodName: string): boolean {
    return (
      methodName.includes("tarjeta") ||
      methodName.includes("credito") ||
      methodName.includes("card")
    );
  }

  /**
   * Verifica si un método de retiro es Bitcoin
   */
  private isBitcoinMethod(methodName: string): boolean {
    return methodName.includes("bitcoin") || methodName.includes("btc");
  }

  /**
   * Obtiene información del tipo de transacción (fallback si no se proporciona)
   * Este método puede ser sobrescrito o extendido según necesidades
   */
  private getTransactionTypeInfo(transactionTypeId: number): TransactionTypeInfo | null {
    // Por defecto retorna null, debe ser proporcionado por el componente
    return null;
  }

  /**
   * Obtiene información del método de retiro (fallback si no se proporciona)
   * Este método puede ser sobrescrito o extendido según necesidades
   */
  private getWithdrawalMethodInfo(withdrawalMethodId: number): WithdrawalMethodInfo | null {
    // Por defecto retorna null, debe ser proporcionado por el componente
    return null;
  }
}

