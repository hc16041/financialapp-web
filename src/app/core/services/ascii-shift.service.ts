import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AsciiShiftService {
  /**
   * Aplica un corrimiento de 128 posiciones a cada carácter (IDA/REGRESO en ASCII extendido).
   * Útil para ofuscar/recuperar cadenas simples en front sin exponer texto plano.
   *
   * @param value Cadena a transformar.
   * @returns Cadena transformada; retorna cadena vacía si `value` es falsy.
   */
  transform(value: string): string {
    if (!value) {
      return "";
    }

    let result = "";
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      const ascii = char.charCodeAt(0);

      let newChar: string;
      if (ascii < 128) {
        newChar = String.fromCharCode(ascii + 128);
      } else {
        newChar = String.fromCharCode(ascii - 128);
      }

      result += newChar;
    }

    return result;
  }
}
