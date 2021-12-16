import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notaventa'
})
export class NotaventaPipe implements PipeTransform {

  transform(tabla_producto:any[], buscar: any): any {
    if (tabla_producto.length>=1) {
        if (buscar!==undefined) {
          return tabla_producto.filter(tabla_producto =>
            (tabla_producto.glosa_tipo_inventario ? tabla_producto.glosa_tipo_inventario : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 || 
            (tabla_producto.codigo_producto ? tabla_producto.codigo_producto : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 || 
            (tabla_producto.glosa_producto ? tabla_producto.glosa_producto : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 ||
            (tabla_producto.glosa_tipo_producto ? tabla_producto.glosa_tipo_producto : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 
            // (tabla_producto.stock_producto ? tabla_producto.stock_producto : '').indexOf(buscar) !=-1 
            );
        }else{
          return tabla_producto;
        }
  }


  }

}
