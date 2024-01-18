import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterUserByNamePipe } from '@shared/pipes/filter-user-by-name/filter-user-by-name.pipe';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { NavBarComponent } from '@feature/users/nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '@feature/login/login/login.component';


@NgModule({
    declarations: [
        HomeLayoutComponent,
        LoginLayoutComponent,
        // NavBarComponent,
        FilterUserByNamePipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        HomeLayoutComponent,
        LoginLayoutComponent,
        FilterUserByNamePipe,
        // NavBarComponent
    ]
})
export class SharedModule {
}
