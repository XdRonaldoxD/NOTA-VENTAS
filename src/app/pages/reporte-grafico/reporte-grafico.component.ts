import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { detalle_nota_venta } from '../../interfaces/detalle_nota_venta';
import { NotaventadetalleService } from '../../services/notaventadetalle/notaventadetalle.service';
declare var $:any;
@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.component.html',
  styleUrls: ['./reporte-grafico.component.css']
})
export class ReporteGraficoComponent implements OnInit {
  public barChartOptions: any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [],
       label: "" 
      },
  ];
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
    this.MostrandoGrafica();
  }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  

    public MostrandoGrafica(){
      let fechaInicial=this.filtro_venta.fecha_inicio.split('-');
      let fechaFinal=this.filtro_venta.fecha_fin.split('-');
      this._NotaVentaDetalle.GraficaNotaVenta(this.token,this.filtro_venta).subscribe((respuesta) => {
        let cantidad = "";
        let mes = "";
        respuesta.cantidadmes.forEach((elementos) => {
          cantidad += elementos + ",";
        });
        respuesta.mes.forEach((element) => {
          mes += `"${element}",`;
        });
        let cantidadEscogido = cantidad.substring(0, cantidad.length - 1);
        let mesEscogido = mes.substring(0, mes.length - 1);
        let cantidadEs=cantidadEscogido.split(',');
        let mesEsc=mesEscogido.split(',');
        this.barChartData[0].label=[`Notas de Ventas vendido en el año ${fechaInicial[0]} son`]
        switch (respuesta.cantidadmes.length) {
          case 1:
            this.barChartData[0].data = [cantidadEs[0]];
            this.barChartLabels = [mesEsc[0]];
            break;
          case 2:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1]];
            this.barChartLabels = [mesEsc[0],mesEsc[1]];
            break;
          case 3:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2]];
            break;
          case 4:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3]];
            break;
          case 5:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4]];
            break;
          case 6:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5]];
            break;
          case 7:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6]];
            break;
          case 8:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6],cantidadEs[7]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6],mesEsc[7]];
            break;
          case 9:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6],cantidadEs[7],cantidadEs[8]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6],mesEsc[7],mesEsc[8]];
            break;
          case 10:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6],cantidadEs[7],cantidadEs[8],cantidadEs[9]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6],mesEsc[7],mesEsc[8],mesEsc[9]];
            break;
          case 11:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6],cantidadEs[7],cantidadEs[8],cantidadEs[9],cantidadEs[10]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6],mesEsc[7],mesEsc[8],mesEsc[9],mesEsc[10]];
            break;
          case 12:
            this.barChartData[0].data = [cantidadEs[0],cantidadEs[1],cantidadEs[2],cantidadEs[3],cantidadEs[4],cantidadEs[5],cantidadEs[6],cantidadEs[7],cantidadEs[8],cantidadEs[9],cantidadEs[10],cantidadEs[11]];
            this.barChartLabels = [mesEsc[0],mesEsc[1],mesEsc[2],mesEsc[3],mesEsc[4],mesEsc[5],mesEsc[6],mesEsc[7],mesEsc[8],mesEsc[9],mesEsc[10],mesEsc[11]];
            break;
          default:
            this.barChartData[0].data = [];
            this.barChartLabels = [];
            break;
        }
      });
    }

}
