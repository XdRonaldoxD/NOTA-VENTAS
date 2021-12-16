import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'presentacion'
})
export class PresentacionPipe implements PipeTransform {

  transform(tabla_presentacion:any[], buscar: any): any {
    if (tabla_presentacion.length>=1) {
        if (buscar!==undefined) {
          return tabla_presentacion.filter(tabla_presentacion =>
            tabla_presentacion.glosa_unidad.toLowerCase().indexOf(buscar.toLowerCase()) !=-1 
            );
        }else{
          return tabla_presentacion;
        }
  }


  }
}
