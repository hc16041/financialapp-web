// Auth Service to interact with external API
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { GlobalComponent } from "src/app/global-component";

import { jwtDecode } from "jwt-decode";
import { User } from "src/app/core/models/User";
import { ApiConnectionService } from "../../../core/services/api-connection.service";
import { LoginRequestDTO } from "../DTO/LoginRequestDTO";
import { LoginResponseDTO } from "../DTO/LoginResponseDTO";
import { LoginDTO } from "../Interface/LoginInterfaces";
import { JwtHelperService } from "@auth0/angular-jwt";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private jwtHelper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private apiConnectionService: ApiConnectionService) {
    // this.currentUserPermissions();
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser")!)
    );
  }

  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const url = `api/Login/Login`;
      return await this.apiConnectionService.sendRequestAsync<LoginResponseDTO>(
        url,
        "POST",
        credentials
      );
    } catch (error) {
      console.error("Error en login:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  async changedPassword(credentials: any): Promise<any> {
    try {
      const url = `api/Login/PasswordChange`;
      return await this.apiConnectionService.sendRequestAsync<any>(
        url,
        "POST",
        credentials
      );
    } catch (error) {
      console.error("Error en login:", error);
      throw error; // Vuelve a lanzar el error para que se maneje en actualizarRegistro
    }
  }

  private get storage(): Storage {
    return sessionStorage;
  }

  get token(): string | null {
    return this.storage.getItem("authToken");
  }

  get username(): string | null {
    return this.storage.getItem("username");
  }

  get id(): number | null {
    return this.storage.getItem("id")
      ? Number(this.storage.getItem("id"))
      : null;
  }
  saveToken(token: string): void {
    console.log("Guardando token:", token);
    // Limpiar posible prefijo Bearer
    const cleanToken = token.replace("Bearer ", "");
    this.storage.setItem("authToken", cleanToken);

    // Eliminar datos redundantes en sessionStorage
    const user = this.decodeToken(cleanToken);
    console.log(user);
    if (user) {
      // Guardar solo lo estrictamente necesario
      this.storage.setItem("profile", user.permisos[0]?.perfil || "");
      this.storage.setItem("permission", JSON.stringify(user?.permisos));
      this.storage.setItem("username", user.usuario);
      this.storage.setItem("id", user.id.toString());
      this.storage.setItem(
        "botones",
        JSON.stringify(this.normalizeButtonKeys(user?.botones))
      );
    }

    console.log(user);
  }

  logout(): void {
    // Limpiar todo el almacenamiento relacionado
    const keysToRemove = [
      "authToken",
      "profile",
      "permission",
      "username",
      "id",
    ];
    keysToRemove.forEach((key) => this.storage.removeItem(key));
  }

  get decodedToken(): any {
    const token = this.token;
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  get userData(): any {
    if (!this.token) return null;

    try {
      const decoded = this.jwtHelper.decodeToken(this.token);
      return {
        id: Number(decoded?.Id),
        usuario: decoded?.Usuario,
        mac_addres: decoded?.Mac_Adress,
        codigo_vendedor: decoded?.Codigo_Vendedor,
        cambio_contrasena: Number(decoded?.Cambio_Contrasena),
        nom_colaborador: decoded.Nombre_Colaborador,
        cargo: decoded?.cargo,
        botones: this.normalizeButtonKeys(JSON.parse(decoded?.Botones)),
        permisos: JSON.parse(decoded?.Permisos) || [], // Convertir de string a array
        expiracion: new Date(decoded?.exp),

        // ... otras propiedades
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  checkTokenExpiration(): boolean {
    if (!this.token) return false;
    return this.jwtHelper.isTokenExpired(this.token);
    // const decodedToken = this.jwtHelper.decodeToken(this.token);
    // const expirationDate = new Date(decodedToken.exp * 1000);
    // return expirationDate < new Date(); // Verifica si la fecha de expiración es menor que la fecha actual
  }

  checkPasswordChange(): boolean {
    if (!this.token) return false;
    // const decodedToken = this.jwtHelper.decodeToken(this.token);
    // const cambioContrasena = decodedToken.Cambio_Contrasena;
    // return cambioContrasena === 0; // Verifica si el valor es 0 (no cambiado)
    return this.userData?.cambio_contrasena === 1;

    //cambiar a 1, que es la validacion correcta.
  }

  hasPermission(requiredPermission: string): boolean {
    if (!this.token) return false;
    return (
      this.userData?.permisos?.some((p: any) => p.url === requiredPermission) ||
      false
    );
  }

  decodeToken(token: string): LoginDTO | null {
    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return {
        id: Number(decoded.Id),
        usuario: decoded.Usuario,
        mac_addres: decoded.Mac_Adress,
        codigo_vendedor: decoded.Codigo_Vendedor,
        cambio_contrasena: Number(decoded.Cambio_Contrasena),
        nom_colaborador: decoded.Nombre_Colaborador,
        cargo: decoded.Cargo,
        botones: JSON.parse(decoded.Botones),
        permisos: JSON.parse(decoded.Permisos), // Convertir de string a array
        expiracion: new Date(decoded.exp),
      };
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  TokenHandler(): void {
    const tokenWithBearer = localStorage.getItem("authToken");

    if (tokenWithBearer) {
      const tokenWithoutBearer = tokenWithBearer.replace("Bearer ", "");
      try {
        const decodedToken = jwtDecode(tokenWithoutBearer);
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

  // Función para convertir las claves del objeto
  normalizeButtonKeys(buttons: any): { [key: string]: boolean } {
    const normalized: { [key: string]: boolean } = {};

    Object.keys(buttons).forEach((originalKey) => {
      // Eliminar el prefijo 'Btn_' y convertir a camelCase
      const key = originalKey
        .replace(/^Btn_/, "") // Quitar prefijo
        .toLowerCase() // Convertir todo a minúscula
        .replace(/_([a-z])/g, (_, letra) => letra.toUpperCase()); // Convertir snake_case a camelCase

      normalized[key] = buttons[originalKey];
    });

    return normalized;
  }

  // private currentUserPermissions() {
  //   const storedPermissions = sessionStorage.getItem("permission");
  //   this.userPermissions = storedPermissions
  //     ? JSON.parse(storedPermissions)
  //     : [];
  // }
}
