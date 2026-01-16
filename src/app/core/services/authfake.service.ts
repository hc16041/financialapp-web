import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/User";

@Injectable({ providedIn: "root" })
export class AuthfakeauthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser")!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Usuario actual en sesión (valor inmediato del BehaviorSubject).
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Autentica contra endpoint fake `/users/authenticate`.
   * @param email Correo del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable con el usuario autenticado; persiste en sessionStorage si trae token.
   */
  login(email: string, password: string) {
    return this.http
      .post<any>(`/users/authenticate`, { email, password })

      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  /**
   * Cierra sesión removiendo el usuario de sessionStorage.
   */
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null!);
  }
}
