import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalComponent } from '../../global-component';
import { AuthNewService } from './auth-new.service';

export interface BiometricStatus {
  isEnabled: boolean;
  registeredAt: string | null;
}

export interface RegisterBiometricRequest {
  credentialId: string;
  publicKey?: string;
}

export interface BiometricLoginRequest {
  email: string;
  credentialId: string;
  signature?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BiometricService {
  private http = inject(HttpClient);
  private authService = inject(AuthNewService);
  private readonly API_URL = `${GlobalComponent.AUTH_API}auth`;

  /**
   * Obtiene el estado de la autenticación biométrica del usuario actual.
   * @returns Observable con `BiometricStatus` del backend.
   */
  getBiometricStatus(): Observable<BiometricStatus> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<BiometricStatus>(`${this.API_URL}/biometric-status`, { headers });
  }

  /**
   * Registra una credencial biométrica para el usuario actual.
   * @param credentialId Identificador de la credencial WebAuthn.
   * @param publicKey Clave pública opcional devuelta por el navegador.
   * @returns Observable con el nuevo estado biométrico.
   */
  registerBiometric(credentialId: string, publicKey?: string): Observable<BiometricStatus> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body: RegisterBiometricRequest = {
      credentialId,
      publicKey
    };

    return this.http.post<BiometricStatus>(`${this.API_URL}/register-biometric`, body, { headers });
  }

  /**
   * Autentica usando credenciales biométricas existentes.
   * @param email Correo del usuario.
   * @param credentialId Id de la credencial registrada.
   * @param signature Firma opcional devuelta por WebAuthn.
   * @returns Observable con la respuesta de autenticación.
   */
  loginWithBiometric(email: string, credentialId: string, signature?: string): Observable<any> {
    const body: BiometricLoginRequest = {
      email,
      credentialId,
      signature
    };

    return this.http.post<any>(`${this.API_URL}/login-biometric`, body);
  }

  /**
   * Desactiva la autenticación biométrica para el usuario actual.
   * @returns Observable con el estado actualizado.
   */
  disableBiometric(): Observable<BiometricStatus> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('No hay token de autenticación'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<BiometricStatus>(`${this.API_URL}/disable-biometric`, {}, { headers });
  }

  /**
   * Verifica si el navegador soporta WebAuthn.
   * @returns `true` si WebAuthn está disponible.
   */
  isWebAuthnAvailable(): boolean {
    return typeof window !== 'undefined' && 
           'PublicKeyCredential' in window && 
           typeof PublicKeyCredential !== 'undefined';
  }

  /**
   * Registra una credencial biométrica usando WebAuthn.
   * @param userId Id interno de usuario.
   * @param userName Nombre para mostrar.
   * @param userEmail Correo del usuario.
   * @returns Credencial generada (id y publicKey opcional).
   */
  async registerWebAuthnCredential(userId: number, userName: string, userEmail: string): Promise<{ credentialId: string; publicKey?: string }> {
    if (!this.isWebAuthnAvailable()) {
      throw new Error('WebAuthn no está disponible en este navegador');
    }

    try {
      // Crear opciones para la creación de credenciales
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: this.generateChallenge(),
        rp: {
          name: 'Financial App',
          id: window.location.hostname
        },
        user: {
          id: new TextEncoder().encode(userId.toString()),
          name: userEmail,
          displayName: userName
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform', // Preferir autenticadores de plataforma (huella dactilar)
          userVerification: 'required'
        },
        timeout: 60000,
        attestation: 'direct'
      };

      // Crear la credencial
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      }) as PublicKeyCredential;

      if (!credential || !credential.response) {
        throw new Error('No se pudo crear la credencial');
      }

      const response = credential.response as AuthenticatorAttestationResponse;
      const credentialId = this.arrayBufferToBase64(credential.rawId);
      const publicKey = this.arrayBufferToBase64(response.getPublicKey() || new ArrayBuffer(0));

      return {
        credentialId,
        publicKey: publicKey || undefined
      };
    } catch (error: any) {
      console.error('Error registrando credencial WebAuthn:', error);
      throw new Error(`Error al registrar huella dactilar: ${error.message || 'Error desconocido'}`);
    }
  }

  /**
   * Autentica con WebAuthn usando una credencial registrada.
   * @param email Correo del usuario.
   * @param credentialId Id de la credencial WebAuthn.
   * @returns Firma codificada en base64 si la autenticación es exitosa.
   */
  async authenticateWithWebAuthn(email: string, credentialId: string): Promise<{ signature?: string }> {
    if (!this.isWebAuthnAvailable()) {
      throw new Error('WebAuthn no está disponible en este navegador');
    }

    try {
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: this.generateChallenge(),
        allowCredentials: [{
          id: this.base64ToArrayBuffer(credentialId),
          type: 'public-key'
        }],
        timeout: 60000,
        userVerification: 'required'
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      }) as PublicKeyCredential;

      if (!assertion || !assertion.response) {
        throw new Error('No se pudo autenticar');
      }

      const response = assertion.response as AuthenticatorAssertionResponse;
      const signature = this.arrayBufferToBase64(response.signature);

      return { signature };
    } catch (error: any) {
      console.error('Error autenticando con WebAuthn:', error);
      throw new Error(`Error al autenticar con huella dactilar: ${error.message || 'Error desconocido'}`);
    }
  }

  /**
   * Genera un challenge aleatorio para WebAuthn.
   * @returns ArrayBuffer con bytes aleatorios.
   */
  private generateChallenge(): ArrayBuffer {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return array.buffer;
  }

  /**
   * Convierte `ArrayBuffer` a cadena Base64.
   * @param buffer Datos en binario.
   * @returns Cadena en Base64.
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convierte una cadena Base64 a `ArrayBuffer`.
   * @param base64 Cadena codificada.
   * @returns Buffer resultante.
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

