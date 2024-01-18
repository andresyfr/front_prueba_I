import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserByName',
})
export class FilterUserByNamePipe implements PipeTransform {

  transform(usuarios: any[], terminoBuscado: string): any[] {
    if(!usuarios || !terminoBuscado){
      return usuarios;
    }
    terminoBuscado = terminoBuscado.toLowerCase();
    return usuarios.filter(usuario => {
      const nombreCompleto = (usuario.first_name+" "+usuario.last_name).toLowerCase();
      return nombreCompleto.includes(terminoBuscado);
    })
  }

}
