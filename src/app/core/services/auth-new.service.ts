import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { GlobalComponent } from "../../global-component";
import { jwtDecode } from "jwt-decode";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  userId: number;
  expiresAt: string;
}

export interface DecodedToken {
  UserId?: string;
  nameid?: string;
  email?: string;
  name?: string;
  exp?: number;
  [key: string]: unknown;
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthNewService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser$: Observable<AuthResponse | null>;
  private readonly TOKEN_KEY = "authToken";
  private readonly USER_KEY = "currentUser";

  constructor() {
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      storedUser
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Inicia sesión con email y contraseña.
   * @param credentials Credenciales de acceso.
   * @returns Observable con el token y datos del usuario.
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${GlobalComponent.AUTH_API}auth/login`,
        credentials,
        httpOptions
      )
      .pipe(
        map((response) => {
          this.saveAuthData(response);
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError((error) => {
          console.error("Error en login:", error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Registra un nuevo usuario.
   * @param userData Datos de registro.
   * @returns Observable con el token y datos del usuario.
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${GlobalComponent.AUTH_API}auth/register`,
        {
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
        },
        httpOptions
      )
      .pipe(
        map((response) => {
          this.saveAuthData(response);
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError((error) => {
          console.error("Error en registro:", error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Solicita restablecimiento de contraseña.
   * @param email Correo del usuario a recuperar.
   * @returns Observable de la operación.
   */
  forgotPassword(email: string): Observable<unknown> {
    const request: ForgotPasswordRequest = { email };
    return this.http.post(
      `${GlobalComponent.AUTH_API}auth/forgot-password`,
      request,
      httpOptions
    );
  }

  /**
   * Restablece la contraseña usando un token.
   * @param data Token, email y nueva contraseña.
   * @returns Observable de la operación.
   */
  resetPassword(data: ResetPasswordRequest): Observable<unknown> {
    return this.http.post(
      `${GlobalComponent.AUTH_API}auth/reset-password`,
      {
        token: data.token,
        email: data.email,
        newPassword: data.newPassword,
      },
      httpOptions
    );
  }

  /**
   * Cierra sesión limpiando token/usuario en sessionStorage y redirige a login.
   */
  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(["/auth/login"]);
  }

  /**
   * Obtiene el token JWT almacenado en sessionStorage.
   * @returns Token o `null` si no existe.
   */
  getToken(): string | null {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token) {
    } else {
      console.warn("[AuthNewService] No se encontró token en sessionStorage");
    }
    return token;
  }

  /**
   * Verifica si el usuario está autenticado y el token no expiró.
   * @returns `true` si el token es válido.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const expirationDate = decoded.exp ? new Date(decoded.exp * 1000) : null;

      if (expirationDate && expirationDate < new Date()) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error decodificando token:", error);
      return false;
    }
  }

  /**
   * Obtiene el usuario actual almacenado en memoria.
   * @returns Usuario autenticado o `null`.
   */
  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtiene el ID del usuario desde el token JWT.
   * @returns Id numérico o `null` si no está presente.
   */
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.UserId || decoded.nameid;
      return userId ? parseInt(userId, 10) : null;
    } catch (error) {
      console.error("Error obteniendo UserId:", error);
      return null;
    }
  }

  /**
   * Obtiene el email del usuario desde el token JWT.
   * @returns Email o `null` si no existe.
   */
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.email || null;
    } catch (error) {
      console.error("Error obteniendo email:", error);
      return null;
    }
  }

  /**
   * Persiste token y datos de usuario en sessionStorage.
   * @param response Respuesta de autenticación.
   */
  private saveAuthData(response: AuthResponse): void {
    sessionStorage.setItem(this.TOKEN_KEY, response.token);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(response));
  }

  /**
   * Lee el usuario almacenado en sessionStorage.
   * @returns Usuario parseado o `null` si no hay datos válidos.
   */
  private getStoredUser(): AuthResponse | null {
    const userStr = sessionStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parseando usuario almacenado:", error);
        return null;
      }
    }
    return null;
  }
}
