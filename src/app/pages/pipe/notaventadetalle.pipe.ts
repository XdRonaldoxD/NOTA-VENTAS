import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notaventadetalle'
})
export class NotaventadetallePipe implements PipeTransform {

  transform(tabla_producto:any[], buscar: any): any {
    if (tabla_producto.length>=1) {
        if (buscar!==undefined) {
          return tabla_producto.filter(tabla_producto =>
            (tabla_producto.fecha_creacion_venta+' '+tabla_producto.hora_creacion_venta ? tabla_producto.fecha_creacion_venta+' '+tabla_producto.hora_creacion_venta : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 ||
            (tabla_producto.nombre_usuario+' '+tabla_producto.apellido_usuario ? tabla_producto.nombre_usuario+' '+tabla_producto.apellido_usuario  : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1  
            // (tabla_producto.numero_venta ? tabla_producto.numero_venta  : '').toLowerCase(0).indexOf(buscar.toLowerCase(0)) !=-1  
            // (tabla_producto.numero_venta ? tabla_producto.numero_venta : '').indexOf(buscar) !=-1 
            );
        }else{
          return tabla_producto;
        }
  }


  }

}
