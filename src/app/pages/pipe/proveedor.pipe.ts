import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proveedor'
})
export class ProveedorPipe implements PipeTransform {

  transform(tabla_proveedor:any[], buscar: any): any {
    console.log(tabla_proveedor);
    if (tabla_proveedor.length>=1) {
        if (buscar!==undefined) {
          return tabla_proveedor.filter(tabla_proveedor =>
            tabla_proveedor.glosa_proveedor.toLowerCase().indexOf(buscar.toLowerCase()) !=-1 || 
            tabla_proveedor.direccion_proveedor.toLowerCase().indexOf(buscar.toLowerCase()) !=-1 || 
            (tabla_proveedor.ruc_proveedor ? tabla_proveedor.ruc_proveedor : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1  ||
            (tabla_proveedor.telefono_proveedor ? tabla_proveedor.telefono_proveedor : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 ||
            (tabla_proveedor.e_mail_proveedor ? tabla_proveedor.e_mail_proveedor : '').toLowerCase().indexOf(buscar.toLowerCase()) !=-1 

            
            );
        }else{
          return tabla_proveedor;
        }
  }


  }

}
