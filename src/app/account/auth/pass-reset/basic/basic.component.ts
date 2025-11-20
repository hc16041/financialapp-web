import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthNewService } from 'src/app/core/services/auth-new.service';
import { AlertcustomService } from 'src/app/core/services/alertcustom.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})

/**
 * Pass-Reset Basic Component
 * Maneja tanto forgot password como reset password con token
 */
export class BasicComponent implements OnInit {
  passresetForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  success = false;
  isLoading = false;
  isResetMode = false; // true si viene con token (reset), false si es forgot password
  token: string | null = null;
  email: string | null = null;
  fieldTextType = false;
  confirmFieldTextType = false;
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthNewService,
    private alertService: AlertcustomService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Verificar si viene con token (modo reset password)
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      this.email = params['email'] || null;
      this.isResetMode = !!this.token;

      if (this.isResetMode) {
        // Modo reset password con token
        this.passresetForm = this.formBuilder.group({
          email: [this.email || '', [Validators.required, Validators.email]],
          newPassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        }, {
          validators: this.passwordMatchValidator
        });
      } else {
        // Modo forgot password
        this.passresetForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
        });
      }
    });
  }

  // Validator personalizado para confirmar contraseña
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // convenience getter for easy access to form fields
  get f() { return this.passresetForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = false;

    if (this.passresetForm.invalid) {
      return;
    }

    if (this.isResetMode) {
      if (this.passresetForm.errors?.['passwordMismatch']) {
        this.error = 'Las contraseñas no coinciden';
        return;
      }
      this.resetPassword();
    } else {
      this.forgotPassword();
    }
  }

  forgotPassword(): void {
    this.isLoading = true;
    const email = this.f['email'].value;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.success = true;
        this.alertService.showSuccess('Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en forgot password:', error);
        
        let errorMessage = 'Error al solicitar restablecimiento de contraseña';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.error = errorMessage;
        this.alertService.showError(errorMessage);
      }
    });
  }

  resetPassword(): void {
    if (!this.token || !this.email) {
      this.error = 'Token o email no válido';
      return;
    }

    this.isLoading = true;
    const resetData = {
      token: this.token,
      email: this.f['email'].value,
      newPassword: this.f['newPassword'].value,
      confirmPassword: this.f['confirmPassword'].value,
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.success = true;
        this.alertService.showSuccess('Contraseña restablecida exitosamente. Por favor inicia sesión.');
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en reset password:', error);
        
        let errorMessage = 'Error al restablecer la contraseña';
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfirmFieldTextType() {
    this.confirmFieldTextType = !this.confirmFieldTextType;
  }
}
