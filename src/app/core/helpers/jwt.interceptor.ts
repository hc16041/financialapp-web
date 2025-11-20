import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthNewService } from '../services/auth-new.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthNewService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Obtener el token del nuevo servicio de autenticación
        const token = this.authService.getToken();
        
        // Agregar el token a todas las peticiones excepto las de autenticación
        if (token && !request.url.includes('/auth/login') && !request.url.includes('/auth/register') && !request.url.includes('/auth/forgot-password') && !request.url.includes('/auth/reset-password')) {
            console.log('[JwtInterceptor] Agregando token a petición:', request.url);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else if (!token && !request.url.includes('/auth/')) {
            console.warn('[JwtInterceptor] No hay token disponible para:', request.url);
        }
        
        return next.handle(request);
    }
}
