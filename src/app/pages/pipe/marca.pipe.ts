import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'marca'
})
export class MarcaPipe implements PipeTransform {

  transform(cliente:any[], cli: any): any {
    const restarea = [];
    if (cliente.length>=1) {
        if (cli!==undefined) {
          return cliente.filter(tablasubcafe =>
            (tablasubcafe.glosa_marca ? tablasubcafe.glosa_marca : '').toLowerCase().indexOf(cli.toLowerCase()) !=-1);
        }else{
          return cliente;
        }
  }


  }

}
