import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/login/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private estaAutenticado: boolean ;
  loginStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  user: Usuario;
  private apiUrl = 'https://reqres.in/api/login'
  loginTokenChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private http:HttpClient
  ){}

  /**
  * El nombre de este metodo no debería ser cambiado, pero de ser necesario podrías cambiar la firma
  * */
  public login() {
    this.loginConParametro();
    this.estaAutenticado = true;
    this.loginStatusChange.emit(this.estaAutenticado);
  }

  /**
   * también se puede realizar con jwt en angular, 
   * sin embargo, para efectos de la prueba y 
   * el tiempo se realiza de forma manual
   */
  private async loginConParametro() 
  {
    console.log('ingrese_login');
    if(this.user.email!=='' && this.user.password!=='' && this.user.password.length>=8){
      console.log('ingrese_validación_login');
      this.enviarDatos(this.user)
      .then(response => {
        if(response.token){
          console.log('el token es: '+response.token);
          this.loginTokenChange.emit(response.token);
          this.estaAutenticado = true;
          this.loginStatusChange.emit(true);
        }
      },error => {
        console.log('Error al enviar datos', error.message);
        this.estaAutenticado = false;
        this.loginStatusChange.emit(false);
        this.loginTokenChange.emit('');
      });
    }
  }

  public async logOut(){
    localStorage.clear();
    this.estaAutenticado=false;
    this.loginStatusChange.emit(false);
    this.router.navigateByUrl('/');
  }

  enviarDatos(data: any): Promise<any>{
    console.log('Enviando datos al servidor');
    return this.http.post(this.apiUrl,data).toPromise();
  }

  async seEncuentraAutenticado():Promise<boolean>{
    return this.estaAutenticado;
  }

  async fijarEsAutenticado(valor :boolean){
    this.estaAutenticado = valor;
  }

  estAautenticado(){
    return this.estaAutenticado;
  }
}
