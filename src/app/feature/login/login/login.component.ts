import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  private formSubmit: boolean;
  private message :boolean = false;
  private error :boolean = false;
  private messageString = '';
  private errorString = '';
  private textPasswordError='';
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}
  
  ngOnInit(): void {
    this.form = this.form =this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.loginService.logOut();
    this.formSubmit = false;
  }

  atributosInvalidos(atributo: string){
    //console.log('ingrese validar atributos: '+this.form.get(atributo).valid + " "+this.form.get(atributo).touched+" "+
    //this.form.get(atributo).untouched+" "+ this.formSubmit);
    if(atributo === 'password'){
      console.log('value atributos invalidos '+this.form.get(atributo).value);
      if(!this.form.get(atributo).value){
        this.textPasswordError='Password is required';
      }
      else if((this.form.get(atributo).value).length < 8){
        this.textPasswordError='The minimum of characters will be 8';
      }
    }
    return (
      (!this.form.get(atributo).valid && this.form.get(atributo).touched) ||
      (this.form.get(atributo).untouched && this.formSubmit)
    )
  }
 
  async submitLogin(){
    console.log('ingrese: submitLogin');
    if(this.form.valid){
      this.loginService.user=this.form.value;
      this.loginService.login();
      // await this.espera(3500);
      this.loginService.loginStatusChange.subscribe(async (status)=>{
          if(status){
            this.mostrarMensajeError(true);
            await this.espera(2000);
            this.redirectUsers();
          }else{
            this.mostrarMensajeError(false);
          }
      });
    }
    this.formSubmit = true;
  }
  /**
   * Este método no se puede modificar
   * */
  public redirectUsers(): void {
    this.router.navigateByUrl('/users/list');
  }

  espera(milisegundos: number){
    return new Promise(resolve => setTimeout(resolve,milisegundos));
  }

  async mostrarMensajeError(cual: boolean){
    console.log('cual: '+cual);
    if(cual && this.loginService.loginStatusChange.subscribe((value:boolean)=> value)){
      this.messageString=("Login succesfull with the email: "+this.form.value.email);
      this.message = true;
      this.error = false;
    }else{
      this.errorString=("Login failed verify the email and password");
      this.error = true;
      this.message=false;
    }
    await this.espera(2000);
    this.error=false;
    this.message=false;
    this.messageString='';
    this.errorString='';
    this.formSubmit = false;
  }
}
