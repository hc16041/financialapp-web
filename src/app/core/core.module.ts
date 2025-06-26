import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { apiInterceptor } from './interceptors/api-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { ApiService } from './services/apiservice';
import { AuthService } from './services/authservice';
import { LoggerService } from './services/loggerservice';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: apiInterceptor,
      multi: true
    },
    ApiService,
    AuthService,
    LoggerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}