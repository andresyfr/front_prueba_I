import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        LoginRoutingModule
     ],
     exports: [
        LoginComponent
     ]
})
export class LoginModule {
}
