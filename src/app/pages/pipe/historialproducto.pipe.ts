import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'historialproducto'
})
export class HistorialproductoPipe implements PipeTransform {

  transform(tabla_producto: any[], buscar: any): any {
    if (tabla_producto != undefined) {
      if (tabla_producto.length >= 1) {
        if (buscar !== undefined) {
          return tabla_producto.filter(tabla_producto =>
            (tabla_producto.tipo_movimiento ? tabla_producto.tipo_movimiento : '').toLowerCase().indexOf(buscar.toLowerCase()) != -1 ||
            (tabla_producto.fecha_producto_historial ? tabla_producto.fecha_producto_historial : '').toLowerCase().indexOf(buscar.toLowerCase()) != -1 ||
            (tabla_producto.nombre_usuario + ' ' + tabla_producto.apellido_usuario ? tabla_producto.nombre_usuario + ' ' + tabla_producto.apellido_usuario : '').toLowerCase().indexOf(buscar.toLowerCase()) != -1
            // (tabla_producto.glosa_tipo_producto ? tabla_producto.glosa_tipo_producto : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 
            // (tabla_producto.stock_producto ? tabla_producto.stock_producto : '').indexOf(buscar) !=-1 
          );
        } else {
          return tabla_producto;
        }
      }
    }


  }

}
