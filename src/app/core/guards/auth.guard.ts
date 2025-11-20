import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from "@angular/router";
import { AuthNewService } from "../services/auth-new.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthNewService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Si no está autenticado, redirigir al login con la URL de retorno
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
