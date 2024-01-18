import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { UsersService } from './shared/services/users/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { UsersMockService } from 'hacker-rank/test/data/users-mock.service';
import { TokenGuard } from '@core/guard/token/token.guard';
import { SELECTORS } from 'hacker-rank/shared/util/selectors';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userService: UsersService;
  let redirectPage;
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsersService', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        {
          provide: UsersService, useValue: spy, useClass: UsersMockService,
        },
        TokenGuard,
      ],
    });
    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    userService = TestBed.inject(UsersService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('Personal Test Andres=> Los campos están vacíos y deben aparecer el mensaje de error y deshabilitar para crear usuario', () => {

    // let inputNameError: HTMLDivElement;
    // let inputJobError: HTMLDivElement;
    // let btn: HTMLButtonElement;
    // const spyRedirection = spyOn(component, 'redirectToListUsers');

    const inputName: HTMLInputElement = document.querySelector('#user-create__name-error');
    const inputNameError = inputName;
    console.log('Input name error: '+inputNameError);
    const inputJob: HTMLInputElement = document.querySelector('#user-create__job-error');
    const inputJobError = inputJob;
    const btn = SELECTORS.USER.CREATE.btnCreate();
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(btn.disabled).toBeTrue();
    expect(inputNameError.value).toContain('Name is required');
    expect(inputJobError.value).toContain('Job is required');
    // expect(spyRedirection).not.toHaveBeenCalled();

  });
});
