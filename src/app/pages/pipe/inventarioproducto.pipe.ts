import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventarioproducto'
})
export class InventarioproductoPipe implements PipeTransform {

  transform(listarInventarioP:any[], inventario: any): any {
    const restarea = [];
    if (listarInventarioP.length>=1) {
        if (inventario!==undefined) {
          return listarInventarioP.filter(listarInventarioP =>
            listarInventarioP.usuario.toLowerCase().indexOf(inventario.toLowerCase()) !=-1 ||
            listarInventarioP.fecha_inventario.toLowerCase().indexOf(inventario.toLowerCase()) !=-1
            );
        }else{
          return listarInventarioP;
        }
  }


  }

}
