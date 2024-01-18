import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../create-user/shared/services/users/users.service';
import { ListaUsuarios } from '../create-user/shared/modelos/users/usuarios.interface';
import { DataUsuario } from '../create-user/shared/modelos/users/data-usuarios.interface';


@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  listUsuarios: ListaUsuarios;
  usuarios: DataUsuario[];
  formListaUsuarios: FormGroup;
  private message: string;
  private error: string;
  terminoBuscado: FormControl = new FormControl('');

  ngOnInit(){
    this.cargarUsuarios(1);
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private usuariosServicio: UsersService)
  {
    this.formListaUsuarios = this.fb.group({
        email:['',Validators.min(0)],
        first_name:['',Validators.min(0)],
        last_name:['',Validators.min(0)],
        avatar:['',Validators.min(0)],
    });
  }

  cargarUsuarios(page:number){
    console.log('ingrese a cargar usuarios');
    this.usuariosServicio.setPage(page);
    this.usuariosServicio.getUsers().then(
      (response: ListaUsuarios) => {
        if(response && Object.keys(response).length > 0){
          this.listUsuarios = response;
          this.usuarios = this.listUsuarios.data;
        }else{
          console.error('La respuesta no tiene una lista valida', response);
        }
      }
    );
  }

  eliminarUsuario(id:number, first_name: string, last_name: string){
    this.usuariosServicio.deleteUserForIndex(id).then(
      async (response)=>{
        this.message=('El usuario: '+first_name+" "+last_name+" se borro correctamente!"); 
        await this.espera(2000);
        this.message='';
        this.cargarUsuarios(1);  
      },
      (error) =>{
        this.error=("error en el borrado de: "+id+" "+first_name+ " "+ last_name);
        console.log("error en el borrado de: "+id+" "+first_name+ " "+ last_name);
      }
    );
  }

  espera(milisegundos: number){
    return new Promise(resolve => setTimeout(resolve,milisegundos));
  }

}