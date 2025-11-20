import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthNewService } from '../../core/services/auth-new.service';
import { AlertcustomService } from '../../core/services/alertcustom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  isLoading = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthNewService,
    private alertService: AlertcustomService
  ) {
    // Si ya está autenticado, redirigir al home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    /**
     * Form Validation
     */
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validator personalizado para confirmar contraseña
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * Register submit form
   */
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.signupForm.invalid) {
      return;
    }

    if (this.signupForm.errors?.['passwordMismatch']) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    this.register();
  }

  register(): void {
    this.isLoading = true;
    const userData = {
      email: this.f['email'].value,
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      phoneNumber: this.f['phoneNumber'].value || undefined,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successmsg = true;
        this.alertService.showSuccess('¡Registro exitoso! Por favor inicia sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en registro:', error);
        
        let errorMessage = 'Error al registrar usuario';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          errorMessage = Object.values(error.error.errors).flat().join(', ');
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.error = errorMessage;
        this.alertService.showError(errorMessage);
      }
    });
  }
}
