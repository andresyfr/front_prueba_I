import { HttpClient,HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListaUsuarios } from '../../modelos/users/usuarios.interface';
import { map } from 'rxjs/operators';

/**
 * El nombre de las clases o métodos no se pueden cambiar
 * */
@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private apiUrl = 'https://reqres.in/api';
  private usuario: any;
  private page:number;
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //'Authorization': localStorage.get('token')
      })
    };
  }
  
  setUsuario(usuario: any){
    this.usuario=usuario;
  }
  getUsuario(){
    return this.usuario;
  }

  getUsers() {
    return this.obtenerUsuarios(this.page);
  }

  setPage(page: number){
    this.page=page;
  }
  getPage(){
    return this.page;
  }

  createUser() {
    return this.guardarUsuarios(this.usuario);
  }

  deleteUserForIndex(index: number) {
    return this.borrarUsuarios(index);
  }

  private guardarUsuarios(usuario: any):Promise<any> {
    console.log('Enviando datos al servidor', usuario);
    return this.http.post(this.apiUrl+"/users",usuario,this.headers).toPromise();
  }

  private obtenerUsuarios(page: number):Promise<any> {
    console.log('Enviando datos al servidor', page);
    return this.http.get<ListaUsuarios>(this.apiUrl+"/users?page="+page,this.headers).pipe(
      map((response:any) => {
        return response as ListaUsuarios;
      })
    ).toPromise();
  }

  solicitudBorrado:string;

  private borrarUsuarios(id:number):Promise<any> {
    console.log(this.headers+'Enviando datos al servidor', id);
    this.solicitudBorrado = this.apiUrl+"/users/"+id;
    console.log("solicitud borrado" + this.solicitudBorrado);
    return this.http.delete(this.solicitudBorrado,this.headers).pipe(
      map((response:any) => {
        return response;
      })
    ).toPromise();
  }
}