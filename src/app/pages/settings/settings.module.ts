import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { BiometricSettingsComponent } from './biometric-settings/biometric-settings.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BiometricSettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
  ],
})
export class SettingsModule {}

