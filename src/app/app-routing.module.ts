import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '@core/guard/token/token.guard';
//import { ListUsersComponent } from '@feature/users/list-users/list-users.component';

const MAIN = '/users';

const routes: Routes = [
  { 
    path: '*',redirectTo:MAIN,pathMatch: 'full'
  }, 
  { 
    path: '',redirectTo:'login',pathMatch: 'full'
  }, 
  {
    path: 'login',
    // component: LoginLayoutComponent,
    loadChildren: () => import('./feature/login/login.module').then(i => i.LoginModule),
  }, 
  {
    path:'',
    //component: HomeLayoutComponent,
    children:[
      {
        path: 'users',
        loadChildren: () => import('./feature/users/users.module').then(i => i.UsersModule),
        canActivate: [TokenGuard]
      }, 
      { 
        path: 'home', 
        loadChildren: () => import('./feature/feature.module').then(i => i.FeatureModule),
        canActivate: [TokenGuard]
      }, 
    ],
  } ,
  { path: '**', redirectTo: MAIN, pathMatch: 'full' },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
