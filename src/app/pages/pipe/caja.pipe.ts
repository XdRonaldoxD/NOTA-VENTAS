import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caja',
})
export class CajaPipe implements PipeTransform {
  transform(cliente: any[], cli: any): any {
    if (cliente.length >= 1) {
      if (cli !== undefined) {
        return cliente.filter(
          (tablacaja) =>
            tablacaja.glosa_caja.toLowerCase().indexOf(cli.toLowerCase()) !=
              -1 ||
            (tablacaja.folio_caja ? tablacaja.folio_caja : '')
              .toLowerCase()
              .indexOf(cli.toLowerCase()) != -1
        );
      } else {
        return cliente;
      }
    }
  }
}
