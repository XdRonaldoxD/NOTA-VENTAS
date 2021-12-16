import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aperturacaja'
})
export class AperturacajaPipe implements PipeTransform {

    transform(apertura: any[], cli: any): any {
    if (apertura.length >= 1) {
      if (cli !== undefined) {
        return apertura.filter(
          (tablacaja) =>
            (tablacaja.apertura_caja_fechainicio  ? tablacaja.apertura_caja_fechainicio  : '').toLowerCase().indexOf(cli.toLowerCase()) != -1 ||
            (tablacaja.apertura_caja_fechafin  ? tablacaja.apertura_caja_fechafin  : '').toLowerCase().indexOf(cli.toLowerCase()) != -1 ||
            // (tablacaja.apertura_caja_monto_inicial  ? tablacaja.apertura_caja_monto_inicial  : '').indexOf(cli) != -1 ||
            (tablacaja.apertura_caja_monto_final  ? tablacaja.apertura_caja_monto_final  : '').toLowerCase().indexOf(cli.toLowerCase()) != -1 ||
            (tablacaja.apertura_caja_total_ventas ? tablacaja.apertura_caja_total_ventas : '').toLowerCase().indexOf(cli.toLowerCase()) != -1
        );
      } else {
        return apertura;
      }
    }
  }

}
