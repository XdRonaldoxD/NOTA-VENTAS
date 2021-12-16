import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { detalle_nota_venta } from '../../interfaces/detalle_nota_venta';
import { NotaventadetalleService } from '../../services/notaventadetalle/notaventadetalle.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {


  token: any;
  filtro_venta:detalle_nota_venta={};
  constructor(
    private _loginServicio: LoginService,
    private _NotaVentaDetalle: NotaventadetalleService,
  ) { }

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    var fecha = new Date(); //Fecha actual
    var mes :any= fecha.getMonth() + 1; //obteniendo mes
    var mes2:any = fecha.getMonth(); //obteniendo mes
    var dia:any = fecha.getDate(); //obteniendo dia
    var ano:any = fecha.getFullYear(); //obteniendo año
    if (dia < 10) {
        dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (mes < 10) {
        mes = '0' + mes; //agrega cero si el menor de 10
    }
    if (mes2 < 10) {
        mes2 = 0+`${mes2}`;
    }
    this.filtro_venta.fecha_inicio=`${ano}-${mes2}-${dia}`;
    this.filtro_venta.fecha_fin=`${ano}-${mes}-${dia}`;
  }

    public MostrararReporte(){
      this._NotaVentaDetalle.ReporteNotaVenta(this.token,this.filtro_venta).subscribe((respuesta) => {
        let html='';
        Object.keys(respuesta).forEach(indice => {
           html+=`<strong>${indice}</strong>
          <div class="table-responsive-lg">
              <table class="datatable table table-stripped">
                  <thead>
                      <tr>
                          <th class="text-center">Codigo Producto</th>
                          <th class="text-center">Nombre Producto</th>
                          <th class="text-center">Cantidad </th>
                          <th class="text-center">Total Venta</th>
                      </tr>
                  </thead>
                  <tbody>`;
                  let total=0;
                  respuesta[indice].forEach(element => {
                    total+=element['valor_venta'];
                    html+=`<tr>
                    <td style="vertical-align:middle;" class="text-center"> ${element['codigo_producto']}</td>
                    <td style="vertical-align:middle;" class="text-center">${element['glosa_producto']}</td>
                    <td style="vertical-align:middle;" class="text-center">${element['cantidad_venta_detalle']}</td>
                    <td style="vertical-align:middle;" class="text-center">${'S/'+ parseFloat(element['valor_venta'].toString()).toFixed(2)}</td>
                     </tr>`;
                  });
                      html+=`<tfoot>
                      <tr>
                          <td class="text-center" colspan="4" style="font-size: 15px;"> <strong>Total:${'S/'+ parseFloat(total.toString()).toFixed(2)}</strong> </td>
                      </tr>
                  </tfoot>
                  </tbody>
              </table>
          </div>`;
      
        });
  
        $("#mostrarReporte").html(html);
     
      });
    }
    linkApi = 'http://apiventa.pe/api/';
    public ImprimirReporte(){
      Swal.fire({
        title: "Reporte Venta",
        html: "Generando el reporte ...",
        text: "Generando el reporte ...",
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
          $.ajax({
            type: 'POST',
            url: this.linkApi+'ReportePDFNotaVenta',
            xhrFields: {
                responseType: 'blob'
            },
            headers: {'Authorization': this.token},
            data: {
                ajax: true,
                fechaInicio: this.filtro_venta.fecha_inicio,
                FechaFin: this.filtro_venta.fecha_fin,
            },
            success: function (json) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(json);
                a.href = url;
                a.download = 'Nota Venta.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
                Swal.close();
            },
            error: function() {
               console.log("Error");
            }
        });
       
        },
      });

   
   
    }
  
}
