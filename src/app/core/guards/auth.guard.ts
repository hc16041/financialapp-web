import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { LoginService } from "src/app/account/login/Services/LoginService";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requiredRoute = route.routeConfig?.path || "";
    //   if (!this.loginService.token) {
    //     this.router.navigate(["/auth/login"], {
    //       queryParams: { returnUrl: state.url },
    //     });
    //     return false;
    //   }

    //   if (this.loginService.checkTokenExpiration()) {
    //     this.loginService.logout(); // Limpiar todo
    //     this.router.navigate(["/token-expired"]);
    //     return false;
    //   }

    //   if (this.loginService.checkPasswordChange()) {
    //     this.router.navigate(["/auth/pass-create/basic"]);
    //     return false;
    //   }

    //   if (requiredRoute != "access-denied" && requiredRoute != "") {
    //     if (!this.loginService.hasPermission(requiredRoute)) {
    //       this.router.navigate(["/access-denied"]);
    //       return false;
    //     }
    //   }
    //   return true;
    // }
    return true;
  }
}
