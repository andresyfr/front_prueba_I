import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { TokenGuard } from '@core/guard/token/token.guard';

const routes: Routes = [
  { path: 'list', component: ListUsersComponent,canActivate: [TokenGuard], },
  { path: 'create', component: CreateUserComponent,canActivate: [TokenGuard], },
  { path: 'home', component: HomeUserComponent,canActivate: [TokenGuard], },
  { path: '**', pathMatch: 'full', redirectTo: '/users/list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
