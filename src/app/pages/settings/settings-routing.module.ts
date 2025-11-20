import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { BiometricSettingsComponent } from './biometric-settings/biometric-settings.component';

const routes: Routes = [
  {
    path: 'biometric',
    component: BiometricSettingsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}

