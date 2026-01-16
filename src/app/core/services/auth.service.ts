import { Injectable } from "@angular/core";
import { getFirebaseBackend } from "../../authUtils";
import { User } from "src/app/store/Authentication/auth.models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { GlobalComponent } from "../../global-component";
import { Store } from "@ngrx/store";
import {
  RegisterSuccess,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from "src/app/store/Authentication/authentication.actions";
import { login } from "../../store/Authentication/authentication.actions";

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: "root" })

/**
 * Servicio de autenticación (legacy) que gestiona login/register y logout.
 */
export class AuthenticationService {
  user!: User;
  currentUserValue: any;

  private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser")!)
    );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Registra un usuario contra el endpoint `signup`.
   * @param email Correo del usuario.
   * @param first_name Nombre.
   * @param password Contraseña.
   * @returns Observable con el usuario creado.
   */
  register(email: string, first_name: string, password: string) {
    // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });

    // Register Api
    return this.http
      .post(
        AUTH_API + "signup",
        {
          email,
          first_name,
          password,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const user = response;
          return user;
        }),
        catchError((error: any) => {
          const errorMessage = "Login failed"; // Customize the error message as needed
          this.store.dispatch(loginFailure({ error: errorMessage }));
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Autentica al usuario contra el endpoint `signin`.
   * @param email Correo del usuario.
   * @param password Contraseña.
   * @returns Observable con el usuario autenticado.
   */
  login(email: string, password: string) {
    // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });

    return this.http
      .post(
        AUTH_API + "signin",
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const user = response;
          return user;
        }),
        catchError((error: any) => {
          const errorMessage = "Login failed"; // Customize the error message as needed
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Retorna el usuario autenticado desde Firebase backend.
   * @returns Usuario actual.
   */
  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  /**
   * Cierra sesión removiendo datos en sessionStorage y disparando acción de logout.
   * @returns Observable vacío.
   */
  logout() {
    this.store.dispatch(logout());
    // logout the user
    // return getFirebaseBackend()!.logout();
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");
    this.currentUserSubject.next(null!);

    return of(undefined).pipe();
  }

  /**
   * Solicita reset de contraseña a Firebase backend.
   * @param email Correo del usuario.
   * @returns Mensaje de respuesta del backend.
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
}
