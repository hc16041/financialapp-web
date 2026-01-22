import { Component, OnInit, inject, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import { AuthNewService } from "src/app/core/services/auth-new.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthNewService);
  private alertService = inject(AlertcustomService);

  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  error = "";
  returnUrl!: string;
  isLoading = false;
  // set the current year
  year: number = new Date().getFullYear();

  constructor() {
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
      error: (error: unknown) => {
        this.isLoading = false;
        console.error("Error en login:", error);
        
        let errorMessage = "Error al iniciar sesión";
        const errorObj = error as { error?: { message?: string; errors?: Record<string, string[]> }; message?: string };
        
        if (errorObj.error?.message) {
          errorMessage = errorObj.error.message;
        } else if (errorObj.error?.errors) {
          errorMessage = Object.values(errorObj.error.errors).flat().join(", ");
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
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
