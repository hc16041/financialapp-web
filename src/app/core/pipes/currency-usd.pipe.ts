import { Pipe, PipeTransform } from "@angular/core";
import { formatMoney } from "../utils/money.util";

/**
 * Pipe único de moneda USD con 2 decimales fijos (`1.2-2`).
 *
 * Uso: `{{ balance() | fpCurrency }}` — equivalente a
 * `currency:'USD':'symbol':'1.2-2'`.
 */
@Pipe({
  name: "fpCurrency",
  standalone: true,
})
export class CurrencyUsdPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return formatMoney(value);
  }
}
