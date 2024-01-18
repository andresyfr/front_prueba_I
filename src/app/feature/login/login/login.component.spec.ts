import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from '@feature/login/login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '@feature/login/shared/services/login/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SELECTORS } from 'hacker-rank/shared/util/selectors';
import { LoginMockService } from 'hacker-rank/test/data/login-mock.service';
import { eventInput } from 'hacker-rank/shared/util/event-input';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { TokenGuard } from '@core/guard/token/token.guard';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let redirectPage;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoginService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        CommonModule,
        LoginRoutingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
      ],
      providers: [
        {
          provide: LoginService, useValue: spy, useClass: LoginMockService,
        },
        TokenGuard,
      ],
    });
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService);
    component = fixture.componentInstance;
    redirectPage = spyOn(component, 'redirectUsers');
    localStorage.clear();
    fixture.detectChanges();
  });


  it('Personal Test Andres=> Validar existencias de los elementos por el ID', async () => {
    const inputEmail = SELECTORS.LOGIN.inputEmail();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const inputBtnLogin = SELECTORS.LOGIN.btnLogin();

    
    fixture.detectChanges();
    
    await fixture.whenStable();
    
    const textInput=inputEmail?.tagName;
    console.log('Esperado: '+textInput);
    expect((inputEmail?.tagName)).toBe('INPUT');
    expect((inputPassword?.tagName)).toBe('INPUT');
    expect((inputBtnLogin?.tagName)).toBe('BUTTON');
  });

  it('Personal Test Andres=> Inicia sesión, debe almacenar el token en localStorage y redirige la pagina', fakeAsync(async () => {
    const inputEmail = SELECTORS.LOGIN.inputEmail();
    const inputPassword = SELECTORS.LOGIN.inputPassword();
    const btnLogin = SELECTORS.LOGIN.btnLogin();
    const email = 'eve.holt@reqres.in';
    const password = 'cityslicka';
    console.log(inputEmail);
    const { token } = await new LoginMockService().login(null);
    loginServiceSpy.login.and.returnValue();

    // const spyLogin = spyOn(loginService, 'login').and.callThrough();


    eventInput(inputEmail, email);
    eventInput(inputPassword, password);
    btnLogin.click();
    fixture.detectChanges();
    tick(1000);


    expect(loginServiceSpy).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toEqual(token);
    expect(redirectPage).toHaveBeenCalled();
  }));
});
