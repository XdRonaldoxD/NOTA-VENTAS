import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventario'
})
export class InventarioPipe implements PipeTransform {

  transform(tabla_inventario:any[], buscar: any): any {
    console.log(tabla_inventario);
    if (tabla_inventario.length>=1) {
        if (buscar!==undefined) {
          return tabla_inventario.filter(tabla_inventario =>
            tabla_inventario.glosa_tipo_inventario.toLowerCase().indexOf(buscar.toLowerCase()) !=-1);
        }else{
          return tabla_inventario;
        }
  }


  }

}
