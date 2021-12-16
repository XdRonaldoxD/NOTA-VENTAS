import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { apertura_caja_interface } from '../../interfaces/caja';
import { AperturaCajaService } from '../../services/apertura_caja/apertura-caja.service';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { detalle_nota_venta } from '../../interfaces/detalle_nota_venta';
declare var $: any;
var contador = 0;
@Component({
  selector: 'app-apertura-caja',
  templateUrl: './apertura-caja.component.html',
  styleUrls: ['./apertura-caja.component.css'],
})
export class AperturaCajaComponent implements OnInit {
  apertura_caja: apertura_caja_interface = {};
  token: any;
  numrows: any;
  paginas: any;
  filtrarTabla: any = '';
  pageActual: number = 1;
  identity: any;
  listarapertura: any = [];
  cargando: boolean;
  validar: boolean = false;
  validarCajaCerrado: boolean = false;
  id_aperturar_caja: any;
  filtro_venta: detalle_nota_venta = {};
  constructor(
    private _activateRoute: ActivatedRoute,
    private _route: Router,
    private _aperturaCajaServicio: AperturaCajaService,
    private _loginServicio: LoginService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();

    var fecha = new Date(); //Fecha actual
    var mes: any = fecha.getMonth() + 1; //obteniendo mes
    var mes2: any = fecha.getMonth(); //obteniendo mes
    var dia: any = fecha.getDate(); //obteniendo dia
    var ano: any = fecha.getFullYear(); //obteniendo año
    var minuto: any = fecha.getMinutes(); //obteniendo año
    if (dia < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (mes < 10) {
      mes = '0' + mes; //agrega cero si el menor de 10
    }
    if (mes2 < 10) {
      mes2 = 0 + `${mes2}`;
    }
    if (minuto < 10) {
      minuto = 0 + `${minuto}`;
    }


    this.filtro_venta.fecha_inicio = `${ano}-${mes2}-${dia}`;
    this.filtro_venta.fecha_fin = `${ano}-${mes}-${dia}`;
    console.log(this.filtro_venta);

    this.MostrarAperturaCaja();
    this.limpiar();
  }
  cambio(evento) {
    this.numrows = evento;
  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }

  AgregarCaja() {
    var fecha = new Date(); //Fecha actual
    var mes: any = fecha.getMonth() + 1; //obteniendo mes
    var dia: any = fecha.getDate(); //obteniendo dia
    var ano: any = fecha.getFullYear(); //obteniendo año
    var minuto: any = fecha.getMinutes(); //obteniendo año
    if (dia < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (mes < 10) {
      mes = '0' + mes; //agrega cero si el menor de 10
    }
  
    if (minuto < 10) {
      minuto = 0 + `${minuto}`;
    }
    this.apertura_caja.apertura_caja_fechainicio = `${dia}/${mes}/${ano}`;
    $('.hora_apertura').val(`${fecha.getHours()}:${minuto}`);
    this._aperturaCajaServicio
      .VerificarCajaAbierta(this.token, this.apertura_caja.id_caja)
      .subscribe((respuesta) => {
        if (respuesta.cajaAbierta != null) {
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'info',
            title: `Ya tiene una caja abierta.`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
        } else {
          $('#modal_marca').modal('show');
        }
      });
  }
  MostrarAperturaCaja() {
    this._activateRoute.params.subscribe((parametro) => {
      this.apertura_caja.id_caja = parametro['id_caja'];
      if (!isNaN(this.apertura_caja.id_caja)) {
        this.listarAperturaCaja(this.apertura_caja.id_caja, this.filtro_venta);
        this.NumeroCaja(this.apertura_caja.id_caja);
      } else {
        this._route.navigate(['/inicio']);
      }
    });
  }

  BuscarFechaCierre() {
    this.listarAperturaCaja(this.apertura_caja.id_caja, this.filtro_venta);
  }

  NumeroCaja(id_caja) {
    this._aperturaCajaServicio
      .NumeroCaja(this.token, id_caja)
      .subscribe((respuesta) => {
        $('.numero_caja').val(respuesta.numero_caja);
      });
  }

  listarAperturaCaja(id_caja, filtro_venta) {
    this.cargando = true;
    this._aperturaCajaServicio
      .TraerAperturaCaja(this.token, id_caja, filtro_venta)
      .subscribe((respuesta) => {
        this.listarapertura = respuesta;
        this.cargando = false;
      });
  }

  EnviarDatosCaja(DatosApertura) {
    this.apertura_caja.id_usuario = this.identity.sub;
    if (DatosApertura.valid) {
      this._aperturaCajaServicio
        .GuardarAperturaCaja(this.token, this.apertura_caja)
        .subscribe((respuesta) => {
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: `Apertura de Caja ${respuesta} Correctamente`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          this.listarAperturaCaja(
            this.apertura_caja.id_caja,
            this.filtro_venta
          );
        });
      this.validar = false;
      DatosApertura.reset();
      $('#modal_marca').modal('hide');
    } else {
      this.validar = true;
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Debe llenar el campo requerido.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  }

  CerrarCaja(id_aperturar_caja) {
    var fecha = new Date(); //Fecha actual
    var mes: any = fecha.getMonth() + 1; //obteniendo mes
    var dia: any = fecha.getDate(); //obteniendo dia
    var ano: any = fecha.getFullYear(); //obteniendo año
    var minuto: any = fecha.getMinutes(); //obteniendo año
    if (dia < 10) {
      dia = '0' + dia; //agrega cero si el menor de 10
    }
    if (mes < 10) {
      mes = '0' + mes; //agrega cero si el menor de 10
    }
    if (minuto < 10) {
      minuto = 0 + `${minuto}`;
    }
    this._aperturaCajaServicio
      .VerificarCajaAbierta(this.token, this.apertura_caja.id_caja)
      .subscribe((respuesta) => {
        this.apertura_caja = respuesta.cajaAbierta;
        this.apertura_caja.apertura_caja_monto_inicial = `S/${this.apertura_caja.apertura_caja_monto_inicial.toFixed(
          2
        )}`;
        this.apertura_caja.apertura_caja_total_ventas = respuesta.totalVentas;
        $('.total_ventas').val(`S/${respuesta.totalVentas.toFixed(2)}`);
        this.apertura_caja.apertura_caja_cantidad_ventas =respuesta.CantidadVentas;
        this.apertura_caja.apertura_caja_descuento_ventas=respuesta.descuentoVentas;
        $('.descuento_ventas').val(`S/${respuesta.descuentoVentas.toFixed(2)}`);
        
        this.apertura_caja.apertura_caja_fechafin = `${dia}/${mes}/${ano}`;
        $('.hora_fin').val(`${fecha.getHours()}:${minuto}`);

        let fechaIncio =
          this.apertura_caja.apertura_caja_fechainicio.split(' ');
        $('.fecha_inicial').val(fechaIncio[0]);
        $('.hora_inicio').val(fechaIncio[1]);

        $('#cerrar_apertura_caja').modal('show');
      });
  }

  CerrarDatosCaja(Apertura) {
    if (Apertura.valid) {
      this._aperturaCajaServicio
        .GuardarAperturaCaja(this.token, this.apertura_caja)
        .subscribe((respuesta) => {
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: `Apertura de Caja ${respuesta} Correctamente`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
          if (respuesta == 'Cerrado') {
            this.apertura_caja.id_apertura_caja = 'undefined';
          }
          this.listarAperturaCaja(
            this.apertura_caja.id_caja,
            this.filtro_venta
          );
        });
      this.validar = false;
      Apertura.reset();
      $('#cerrar_apertura_caja').modal('hide');
      this.validarCajaCerrado = false;
      console.log(this.apertura_caja);
    } else {
      this.validarCajaCerrado = true;
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Debe llenar el campo requerido.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  }

  ReporteCajaFinalizado(id_aperturar_caja) {
    this.id_aperturar_caja = id_aperturar_caja;
    Swal.fire({
      title: 'TICKET',
      html: 'Generando Nota Venta...',
      text: 'Generando Nota Venta...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        var venta_cerrado = `<a style=\"display: none; margin-bottom: 15px;\" class=\"btn btn-primary\" id =\"ver_venta_cerrado\"  target=\"prevAfecta\"  action href=\"http://127.0.0.1:8000/api/ReporteVentaCerrado/${id_aperturar_caja}\" > Previsualizar Boleta Afecta</a>`;
        venta_cerrado +=
          '<iframe style="width:100%;height:440px; border: 1px solid #ccc;border-radius: 6px;"  name="prevAfecta"  frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ></iframe>';
        $('.venta_cerrado').html(venta_cerrado);
        $('#ver_venta_cerrado')[0].click();

        setTimeout(() => {
          Swal.close();
          $('#reporte_caja_finalizado').modal('show');
        }, 200);
      },
    });
  }

  cerrarModal() {
    if ($('.reporte_caja_tab ').hasClass('active') == true) {
      $('#solid-justified-tab3').addClass('active');
      $('.reporte_venta_tab ').addClass('active');
      $('.reporte_caja_tab ').removeClass('active');
      $('#solid-justified-tab2').removeClass('active');
    }
    contador = 0;
  }

  caja_cerrado() {
    if (contador == 0) {
      let html2 = `<iframe style="width: 100%;height:440px;" src="http://127.0.0.1:8000/api/ReporteCajaCerrado/${this.id_aperturar_caja}" frameborder="0"></iframe>`;
      document.querySelector('.caja_cerrado').innerHTML = html2;
      contador++;
    }
  }
}
