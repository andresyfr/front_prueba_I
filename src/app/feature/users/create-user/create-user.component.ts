import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './shared/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  formCreateUsuario: FormGroup;
  private formSubmit: boolean;
  private message: string;
  private error: string;
  constructor(
    private readonly router: Router, private fb: FormBuilder, 
    private usersService: UsersService
  ) {
    this.initForm();
  }
  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void{
    this.formCreateUsuario = this.fb.group({
      name:['',Validators.required],
      job:['',Validators.required]
  });
  }

  submitCreate(){
    
    this.usersService.setUsuario(this.formCreateUsuario.value);
    this.usersService.createUser().then(
      async (response)=>{
        console.log(response);
        if(this.formCreateUsuario.valid){
          this.message="The user with the name "+this.formCreateUsuario.value.name+" has been created successfully";
          this.formSubmit = true;
          await this.espera(2000);
          this.redirectToListUsers();
        }else{
          this.error="The user with the name "+this.formCreateUsuario.value+" has not been created correctly";
          this.formSubmit = false;
        }
      },
      (error) =>{
        this.error="The user name don't was a create, please try again";
        this.formSubmit = false;
      }
    );
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  atributosInvalidos(atributo: string){
    return (
      (!this.formCreateUsuario.get(atributo).valid && this.formCreateUsuario.get(atributo).touched) ||
      (this.formCreateUsuario.get(atributo).untouched && this.formSubmit)
    )
  }

  espera(milisegundos: number){
    return new Promise(resolve => setTimeout(resolve,milisegundos));
  }
}