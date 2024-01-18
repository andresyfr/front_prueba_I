import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { HomeUserComponent } from './home-user/home-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
      HomeUserComponent,
      CreateUserComponent,
      ListUsersComponent,
      //NavBarComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    exports: [
      //NavBarComponent
    ]
})
export class UsersModule {
}
