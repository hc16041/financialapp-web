import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

// Login Auth

import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import { AsciiShiftService } from "../../core/services/ascii-shift.service";
import { LoginRequestDTO } from "./DTO/LoginRequestDTO";
import { LoginResponseDTO } from "./DTO/LoginResponseDTO";
import { LoginService } from "./Services/LoginService";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private asciiShiftService: AsciiShiftService,
    private alertService: AlertcustomService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(["/"]);
    // }
  }

  ngOnInit(): void {
    // if (sessionStorage.getItem("currentUser")) {
    this.router.navigate(["/"]);
    // }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.login();
  }

  login(): void {
    const loginData = new LoginRequestDTO({
      usuario: this.f["username"].value,
      clave: this.asciiShiftService.transform(this.f["password"].value),
      mac_addres: "00:00:00:00:00:00",
    });

    //Login
    this.loginService.login(loginData).then(
      (response: LoginResponseDTO) => {
        // Aquí puedes guardar el token o manejar la respuesta
        if (response.token == null) {
          this.alertService.showWarning(response.respuesta);
        } else {
          this.alertService.showSuccess("Login successful!");
          this.loginService.saveToken(response.token || "");
          this.router.navigate(["/"]);
        }
      },
      (error: LoginResponseDTO | Error) => {
        if (error instanceof Error) {
          console.error("Error inesperado:", error.message);
          this.alertService.showError("Error inesperado:", error.message);
        } else {
          console.error("Error de la API:", error.respuesta);

          this.alertService.showError("Error de la API:", error.respuesta);
          // Maneja el error devuelto por la API
        }
      }
    );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/auth/login"]);
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
