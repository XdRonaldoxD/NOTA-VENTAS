import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { detalle_nota_venta } from '../../interfaces/detalle_nota_venta';
import { NotaventadetalleService } from '../../services/notaventadetalle/notaventadetalle.service';
declare var $:any;
@Component({
  selector: 'app-nota-venta-detalle',
  templateUrl: './nota-venta-detalle.component.html',
  styleUrls: ['./nota-venta-detalle.component.css']
})
export class NotaVentaDetalleComponent implements OnInit {
  numrows: any;
  paginas: any;
  filtrarTabla: any='';
  pageActual: number = 1;
  token: any;
  identity: any;
  listarDetalle: any=[];
  cargando:boolean;
  filtro_venta:detalle_nota_venta={};
  validar:boolean=false;
  constructor(
    private _NotaVentaDetalle: NotaventadetalleService,
    private _loginServicio: LoginService
  ) {}
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
    this.listarNotaDetalle();
    this.limpiar();
  }
  busqueda(evento){
    console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;

  }

  listarNotaDetalle() {
    this.cargando=true;
    this._NotaVentaDetalle.ListarNotaVenta(this.token,this.filtro_venta).subscribe((respuesta) => {
      this.listarDetalle = respuesta;
      this.cargando=false;
    });
  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }
  Visualizar(id_nota_venta){

 
      Swal.fire({
        title: 'TICKET',
        html: 'Visualizando Ticket del Cliente...',
        text: 'Visualizando Ticket del Cliente...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
          this._NotaVentaDetalle.TraerNotaVenta(this.token,id_nota_venta).subscribe(respuesta=>{
            var htmlticket = `<a style="display: none; margin-bottom: 15px;" class="btn btn-primary" id ="verTicket"  target="prevticket"  action href="http://127.0.0.1:8000/api/VisualizarNotaVentaTicket/${respuesta.path_nota_venta}"></a>`;
            htmlticket += `<iframe style="width:100%;height:440px; border: 1px solid #ccc;border-radius: 6px;"  name="prevticket"  frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ></iframe>`;
            $("#viewjs").html(htmlticket);
              $("#verTicket")[0].click();
              $('#mostrar_receta_reporte').modal('show');
              Swal.close();
          });
      
       
        },
      });
  
  
  }

  BuscarNotaVenta(){
    this.listarNotaDetalle();
  }




  
}
