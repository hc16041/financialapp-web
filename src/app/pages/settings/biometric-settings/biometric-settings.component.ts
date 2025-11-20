import { Component, OnInit } from '@angular/core';
import { BiometricService, BiometricStatus } from '../../../core/services/biometric.service';
import { AuthNewService } from '../../../core/services/auth-new.service';

@Component({
  selector: 'app-biometric-settings',
  templateUrl: './biometric-settings.component.html',
  styleUrls: ['./biometric-settings.component.scss']
})
export class BiometricSettingsComponent implements OnInit {
  biometricStatus: BiometricStatus | null = null;
  isLoading = false;
  isRegistering = false;
  isDisabling = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private biometricService: BiometricService,
    private authService: AuthNewService
  ) {}

  ngOnInit(): void {
    this.loadBiometricStatus();
  }

  /**
   * Carga el estado actual de la autenticación biométrica
   */
  loadBiometricStatus(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.biometricService.getBiometricStatus().subscribe({
      next: (status) => {
        this.biometricStatus = status;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando estado biométrico:', error);
        this.errorMessage = error.error?.message || 'Error al cargar el estado de la autenticación biométrica';
        this.isLoading = false;
      }
    });
  }

  /**
   * Verifica si WebAuthn está disponible
   */
  isWebAuthnAvailable(): boolean {
    return this.biometricService.isWebAuthnAvailable();
  }

  /**
   * Registra la huella dactilar
   */
  async registerBiometric(): Promise<void> {
    if (!this.isWebAuthnAvailable()) {
      this.errorMessage = 'La autenticación biométrica no está disponible en este dispositivo o navegador';
      return;
    }

    this.isRegistering = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Registrar credencial usando WebAuthn
      const credential = await this.biometricService.registerWebAuthnCredential(
        currentUser.userId,
        currentUser.fullName,
        currentUser.email
      );

      // Guardar en el servidor
      this.biometricService.registerBiometric(credential.credentialId, credential.publicKey).subscribe({
        next: (status) => {
          this.biometricStatus = status;
          this.isRegistering = false;
          this.successMessage = 'Huella dactilar registrada exitosamente';
        },
        error: (error) => {
          console.error('Error registrando biometría:', error);
          this.errorMessage = error.error?.message || 'Error al registrar la huella dactilar';
          this.isRegistering = false;
        }
      });
    } catch (error: any) {
      console.error('Error en registro biométrico:', error);
      this.errorMessage = error.message || 'Error al registrar la huella dactilar';
      this.isRegistering = false;
    }
  }

  /**
   * Desactiva la autenticación biométrica
   */
  disableBiometric(): void {
    if (!confirm('¿Está seguro de que desea desactivar la autenticación biométrica?')) {
      return;
    }

    this.isDisabling = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.biometricService.disableBiometric().subscribe({
      next: (status) => {
        this.biometricStatus = status;
        this.isDisabling = false;
        this.successMessage = 'Autenticación biométrica desactivada';
      },
      error: (error) => {
        console.error('Error desactivando biometría:', error);
        this.errorMessage = error.error?.message || 'Error al desactivar la autenticación biométrica';
        this.isDisabling = false;
      }
    });
  }

  /**
   * Formatea la fecha de registro
   */
  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  }
}

