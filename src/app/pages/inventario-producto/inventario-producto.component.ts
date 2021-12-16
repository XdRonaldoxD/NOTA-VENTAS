import { Component, OnInit } from '@angular/core';
import { detalle_nota_venta } from '../../interfaces/detalle_nota_venta';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { NotaventadetalleService } from '../../services/notaventadetalle/notaventadetalle.service';
import { ProductoInventarioService } from '../../services/producto_inventario/producto-inventario.service';
declare var $: any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css'],
})
export class InventarioProductoComponent implements OnInit {
  filtrarTabla: any = '';
  numrows: any;
  listarInventario: any = [];
  pageActual: number = 1;
  cargando: boolean;
  token: any;
  paginas: any;
  identity: any;
  filtro_venta: detalle_nota_venta = {};
  constructor(
    private _loginServicio: LoginService,
    private _InventarioProducto: ProductoInventarioService
  ) {}

  ngOnInit(): void {
    this.limpiar();
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();
    var fecha = new Date(); //Fecha actual
    var mes: any = fecha.getMonth() + 1; //obteniendo mes
    var mes2: any = fecha.getMonth(); //obteniendo mes
    var dia: any = fecha.getDate(); //obteniendo dia
    var ano: any = fecha.getFullYear(); //obteniendo año
    if (dia < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (mes < 10) {
      mes = '0' + mes; //agrega cero si el menor de 10
    }
    if (mes2 < 10) {
      mes2 = 0 + `${mes2}`;
    }
    this.filtro_venta.fecha_inicio = `${ano}-${mes2}-${dia}`;
    this.filtro_venta.fecha_fin = `${ano}-${mes}-${dia}`;
  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }
  cambio(evento) {
    this.numrows = evento;
  }

  public MostrararReporte() {
    this._InventarioProducto
      .ReporteNotaVenta(this.token, this.filtro_venta)
      .subscribe((respuesta) => {
        let html = '';
        Object.keys(respuesta).forEach((indice) => {
          html += `<strong>${indice}</strong>
          <div class="table-responsive-lg">
              <table class="datatable table table-stripped">
                  <thead>
                      <tr>
                          <th class="text-center">Codigo Producto</th>
                          <th class="text-center">Nombre Producto</th>
                          <th class="text-center">Cantidad </th>
                          <th class="text-center">Precio </th>
                          <th class="text-center">Total Costo Producto</th>
                      </tr>
                  </thead>
                  <tbody>`;
          let total = 0;
          respuesta[indice].forEach((element) => {
            let totalProducto =element['preciocosto_producto'] ;
            if (totalProducto===null) {
              totalProducto=0;
            }
            total += totalProducto;
            html += `<tr>
                    <td style="vertical-align:middle;" class="text-center"> ${element['codigo_producto']}</td>
                    <td style="vertical-align:middle;" class="text-center">${element['glosa_producto']}</td>
                    <td style="vertical-align:middle;" class="text-center">${element['stock_producto']}</td>
                    <td style="vertical-align:middle;" class="text-center">S/${parseFloat(
                      element['precioventa_producto'].toString()
                    ).toFixed(2)}</td>
                    <td style="vertical-align:middle;" class="text-center">${
                      'S/' + parseFloat(totalProducto.toString()).toFixed(2)
                    }</td>
                     </tr>`;
          });
          html += `<tfoot>
                      <tr>
                          <td class="text-center" colspan="5" style="font-size: 15px;"> <strong>Total:${
                            'S/' + parseFloat(total.toString()).toFixed(2)
                          }</strong> </td>
                      </tr>
                  </tfoot>
                  </tbody>
              </table>
          </div>`;
        });

        $('#mostrarReporte').html(html);
      });
      document.querySelector('#mostrarReporte').classList.remove('d-none');
      document.querySelector("#listarInventario").classList.add("d-none");
  }
  linkApi = 'http://127.0.0.1:8000/api/';
  public ImprimirReporte() {
    Swal.fire({
      title: 'Guardando',
      html: 'Guardando el inventario ...',
      text: 'Guardando el inventario ...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        $.ajax({
          type: 'POST',
          url: this.linkApi + 'AlmacenarProductoInventario',
          // xhrFields: {
          //     responseType: 'blob'
          // },
          headers: { Authorization: this.token },
          data: {
            ajax: true,
            fechaInicio: this.filtro_venta.fecha_inicio,
            FechaFin: this.filtro_venta.fecha_fin,
            id_usuario: this.identity.sub,
          },
          success: function (respuesta) {
            if (respuesta === 'ok') {
              Swal.close();
              Swal.fire({
                toast: true,
                position: 'top',
                icon: 'success',
                title: `Se almaceno la información del inventario.`,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
            }
          },
          error: function () {
            console.log('Error');
          },
        });
      },
    });
  }

  ListarIventario() {
    $('#mostrarReporte').html('');
     $(".buscarListaInventario").removeClass("d-none");
    $(".mostrarReporte").addClass("d-none");
    $(".guardar_producto").addClass("d-none");
    $(".texto-mostrar").html("LISTAR INVENTARIO-PRODUCTO");
    $(".guardar_inventario").removeClass("d-none");

    this.cargando = true;
    document.querySelector('#mostrarReporte').classList.add('d-none');
    document.querySelector("#listarInventario").classList.remove("d-none");
    this._InventarioProducto
      .ListarInventarioProducto(this.token, this.filtro_venta)
      .subscribe((respuesta) => {
        this.listarInventario = respuesta;
        this.cargando = false;
      });
  }

  GuardarIventario(){
    $(".mostrarReporte").removeClass("d-none");
    $(".buscarListaInventario").addClass("d-none");
    $("#listarInventario").addClass("d-none");
    $(".guardar_inventario").addClass("d-none");
    $(".guardar_producto").removeClass("d-none");
    $(".texto-mostrar").html("GUARDAR INVENTARIO-PRODUCTO");
  }

  Visualizar(path){
    Swal.fire({
      title: 'Generando',
      html: 'Generando Inventario del Producto...',
      text: 'Generando Inventario del Producto...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        var venta_cerrado = `<a style=\"display: none; margin-bottom: 15px;\" class=\"btn btn-primary\" id =\"ver_costo_producto\"  target=\"prevAfecta\"  action href=\"http://127.0.0.1:8000/api/visualizarInventarioProducto/${path}\" > Previsualizar Boleta Afecta</a>`;
        venta_cerrado +=
          '<iframe style="width:100%;height:440px; border: 1px solid #ccc;border-radius: 6px;"  name="prevAfecta"  frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ></iframe>';
        $('.venta_cerrado').html(venta_cerrado);
        $('#ver_costo_producto')[0].click();

        setTimeout(() => {
          Swal.close();
          $('#reporte_caja_finalizado').modal('show');
        }, 200);
      },
    });
  }
}
