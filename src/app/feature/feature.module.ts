import { NgModule } from '@angular/core';

import { FeatureRoutingModule } from './feature-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from '@shared/layouts/home-layout.component';
import { LoginLayoutComponent } from '@shared/layouts/login-layout.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UsersModule,
    FeatureRoutingModule
  ]
})
export class FeatureModule { }
