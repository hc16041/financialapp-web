import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { BiometricService, BiometricStatus } from '../../../core/services/biometric.service';
import { AuthNewService } from '../../../core/services/auth-new.service';

@Component({
  selector: 'app-biometric-settings',
  templateUrl: './biometric-settings.component.html',
  styleUrls: ['./biometric-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BiometricSettingsComponent implements OnInit {
  // Inyección de dependencias usando inject()
  private biometricService = inject(BiometricService);
  private authService = inject(AuthNewService);

  // Estado usando signals
  readonly biometricStatusSig = signal<BiometricStatus | null>(null);
  readonly isLoadingSig = signal<boolean>(false);
  readonly isRegisteringSig = signal<boolean>(false);
  readonly isDisablingSig = signal<boolean>(false);
  readonly errorMessageSig = signal<string | null>(null);
  readonly successMessageSig = signal<string | null>(null);

  // Getters para compatibilidad con template
  get biometricStatus(): BiometricStatus | null {
    return this.biometricStatusSig();
  }

  get isLoading(): boolean {
    return this.isLoadingSig();
  }

  get isRegistering(): boolean {
    return this.isRegisteringSig();
  }

  get isDisabling(): boolean {
    return this.isDisablingSig();
  }

  get errorMessage(): string | null {
    return this.errorMessageSig();
  }

  get successMessage(): string | null {
    return this.successMessageSig();
  }

  ngOnInit(): void {
    this.loadBiometricStatus();
  }

  /**
   * Carga el estado actual de la autenticación biométrica
   */
  loadBiometricStatus(): void {
    this.isLoadingSig.set(true);
    this.errorMessageSig.set(null);

    this.biometricService.getBiometricStatus().subscribe({
      next: (status) => {
        this.biometricStatusSig.set(status);
        this.isLoadingSig.set(false);
      },
      error: (error: unknown) => {
        console.error('Error cargando estado biométrico:', error);
        const errorMessage = (error as { error?: { message?: string } })?.error?.message || 'Error al cargar el estado de la autenticación biométrica';
        this.errorMessageSig.set(errorMessage);
        this.isLoadingSig.set(false);
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
      this.errorMessageSig.set('La autenticación biométrica no está disponible en este dispositivo o navegador');
      return;
    }

    this.isRegisteringSig.set(true);
    this.errorMessageSig.set(null);
    this.successMessageSig.set(null);

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
          this.biometricStatusSig.set(status);
          this.isRegisteringSig.set(false);
          this.successMessageSig.set('Huella dactilar registrada exitosamente');
        },
        error: (error: unknown) => {
          console.error('Error registrando biometría:', error);
          const errorMessage = (error as { error?: { message?: string } })?.error?.message || 'Error al registrar la huella dactilar';
          this.errorMessageSig.set(errorMessage);
          this.isRegisteringSig.set(false);
        }
      });
    } catch (error: unknown) {
      console.error('Error en registro biométrico:', error);
      const errorMessage = (error as { message?: string })?.message || 'Error al registrar la huella dactilar';
      this.errorMessageSig.set(errorMessage);
      this.isRegisteringSig.set(false);
    }
  }

  /**
   * Desactiva la autenticación biométrica
   */
  disableBiometric(): void {
    if (!confirm('¿Está seguro de que desea desactivar la autenticación biométrica?')) {
      return;
    }

    this.isDisablingSig.set(true);
    this.errorMessageSig.set(null);
    this.successMessageSig.set(null);

    this.biometricService.disableBiometric().subscribe({
      next: (status) => {
        this.biometricStatusSig.set(status);
        this.isDisablingSig.set(false);
        this.successMessageSig.set('Autenticación biométrica desactivada');
      },
      error: (error: unknown) => {
        console.error('Error desactivando biometría:', error);
        const errorMessage = (error as { error?: { message?: string } })?.error?.message || 'Error al desactivar la autenticación biométrica';
        this.errorMessageSig.set(errorMessage);
        this.isDisablingSig.set(false);
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

  /**
   * Limpia el mensaje de éxito
   */
  clearSuccessMessage(): void {
    this.successMessageSig.set(null);
  }

  /**
   * Limpia el mensaje de error
   */
  clearErrorMessage(): void {
    this.errorMessageSig.set(null);
  }
}

