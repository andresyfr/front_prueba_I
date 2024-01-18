import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './AppMaterialModule';
import { LoginService } from '@feature/login/shared/services/login/login.service';
import { TokenGuard } from '@core/guard/token/token.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersModule } from '@feature/users/users.module';
import { NavBarComponent } from '@feature/users/nav-bar/nav-bar.component';
import { TokenInterceptor } from '@feature/users/create-user/shared/services/users/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  exports:[

  ],
  providers: [LoginService,TokenGuard,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
