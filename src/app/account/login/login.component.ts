import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import { AuthNewService } from "src/app/core/services/auth-new.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;
  isLoading = false;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthNewService,
    private alertService: AlertcustomService
  ) {
    // Si ya está autenticado, redirigir al home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
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
    this.error = "";

    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

  login(): void {
    this.isLoading = true;
    const loginData = {
      email: this.f["email"].value,
      password: this.f["password"].value,
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertService.showSuccess("¡Inicio de sesión exitoso!");
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        console.error("Error en login:", error);
        
        let errorMessage = "Error al iniciar sesión";
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          errorMessage = Object.values(error.error.errors).flat().join(", ");
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.error = errorMessage;
        this.alertService.showError(errorMessage);
      }
    });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
