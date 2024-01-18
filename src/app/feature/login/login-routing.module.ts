import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeLayoutComponent } from '@shared/layouts/home-layout.component';
import { TokenGuard } from '@core/guard/token/token.guard';
import { HomeUserComponent } from '@feature/users/home-user/home-user.component';

const MAIN = '/home';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: MAIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
