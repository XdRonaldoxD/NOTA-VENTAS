import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { NotaventaService } from '../../services/notaventa/notaventa.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import Echo from 'laravel-echo';
declare var $: any;


@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.css'],
})
export class NotaVentaComponent implements OnInit {
  prueba: string;
  @ViewChild("myinput") myInputField: ElementRef;
  @ViewChild("pago") pagoInput: ElementRef;



  filtrarTabla: any = '';
  numrows: any;
  cargando: boolean;
  listaProducto: any = [];

  token: any;
  identity: any;
  pageActual: number = 1;
  construccionTabla: any = [];
  id_aperturar_caja: any;
  paginas: any;
  closeResult = '';

  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  @ViewChild('stateInput') inputField: ElementRef;
  states: any[] = [];
  input: boolean = false;
  dtOptions: DataTables.Settings = {};
  productochekeados: any[] = [];
  Echo: Echo;
  constructor(
    private _loginServicio: LoginService,
    private _NotaVenta: NotaventaService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      language: {
        "decimal": "",
        "emptyTable": "",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "infoFiltered": "(Filtro de _MAX_ total registros)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "No se encontro datos",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Próximo",
          "previous": "Anterior"
        },

        "aria": {
          "sortAscending": ": Activar orden de columna ascendente",
          "sortDescending": ": Activar orden de columna desendente"
        }

      },
      aLengthMenu: [
        [5, 10, 50],
        [5, 10, 50]
      ],
      pageLength: 5,
      destroy: true,
      responsive: true,
      order: false
    };

    // this.webSocket();
    // this.WebSocketEcho();
    this.webSocketPhp();
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();

    this.limpiar();

    this.DatosProducto();
    // this.SeleccionarProducto();

  }

  filterStates(name: string) {
    return this.states.filter(
      (state) => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }



  cambio(evento) {
    this.numrows = evento;
  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }
  SeleccionarProducto() {
    // this.myInputField.nativeElement.focus();
    this._NotaVenta.VerificarCajaAbierto(this.token).subscribe(respuesta => {
      if (Object.keys(respuesta).length > 0) {
        // this.DatosProducto();
        // this.DatosProductoImagen();
        this.id_aperturar_caja = respuesta.id_apertura_caja;
        $('#modal_marca').modal('show');

      } else {
        Swal.fire({
          title: '<h3 style=" margin-bottom: 0px; margin-top: 18px; " >No tiene una caja Abierta.</h3><br>',
          showCloseButton: true,
          icon: 'error',
          //  showCancelButton: true,
          // html: '<a  href="http://localhost:4200/#/Caja"   class="btn btn-success text-white">Abrir Caja</a>',
          focusConfirm: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: "#fff",
          reverseButtons: true,
          confirmButtonText: 'Aperturar Caja',
          buttonsStyling: true,
          //   confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonText: ' Abrir Caja',
          cancelButtonAriaLabel: 'Thumbs down',
          customClass: {
            confirmButton: 'no-show',
            cancelButton: 'btn btn-outline-danger button-margin-right',
          },
          onBeforeOpen: function (ele) {
            console.log(ele);
            // $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-success')
          },
        }).then((result) => {
          if (result.isConfirmed == true) {
            this.router.navigate(['/Caja']);
          } else {
            this.router.navigate(['/Caja']);
          }
        })
      }

    })



  }
  salirModal() {
    if (this.construccionTabla.length > 0) {
      $(".mostrarCalculoVenta").removeClass("d-none")
    } else {
      $(".mostrarCalculoVenta").addClass("d-none")
    }
    $("#modal_marca").modal('hide');

    setTimeout(() => {
      this.DatosProducto();
    }, 1000);
  }

  AperturarCaja() {
    this.router.navigate(['/Caja']);
  }
  DatosProducto() {
    let id_producto = [];
    if (this.construccionTabla.length > 0) {
      this.construccionTabla.forEach((elemento) => {
        id_producto.push(elemento[0]);
      });
    }
    this.cargando = true;
    this._NotaVenta
      .TraerProductoNoEscogidos(this.token, id_producto)
      .subscribe((respuesta) => {
        this.listaProducto = respuesta;
        this.cargando = false;


      });
  }
  DatosProductoImagen() {
    let id_producto = [];
    if (this.construccionTabla.length > 0) {
      this.construccionTabla.forEach((elemento) => {
        id_producto.push(elemento[0]);
      });
    }
    this._NotaVenta
      .TraerProductoNoEscogidos(this.token, id_producto)
      .subscribe((respuesta) => {
        this.states = respuesta.map((element, index) => {
          // console.log(index);
          // let imagen = ''
          // if (index % 2 == 0) {
          //   imagen = 'https://www.disfarma.com.co/fotosproductos/main_producto_22.png';
          // } else {
          //   imagen = `https://www.disfarma.com.co/fotosproductos/main_producto_49.jpg`;

          // }
          let datos = {
            name: element.glosa_producto,
            glosa_tipo_inventario: element.glosa_tipo_inventario,
            precioventa_producto: element.precioventa_producto,
            stock_producto: element.stock_producto,
            glosa_marca: element.glosa_marca,
            // flag: imagen,
            id_producto: element.id_producto
          };
          return datos
        })
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map((state) => (state ? this.filterStates(state) : this.states.slice()))
        );
        this.input = true;
      });
  }
  onEnter(evt: any) {
    console.log(evt.source.value);
    // alert(evt.source.value);
    const selectedState = this.states.find(
      (state) => state.name.toLowerCase() == evt.source.value.toLowerCase()
    );
    if (evt.source.selected) {
      if (selectedState) {
        setTimeout(() => {
          console.log(this.stateCtrl.patchValue(selectedState.name));
        }, 0);
        let datos = {
          0: selectedState.id_producto,
          1: selectedState.glosa_tipo_inventario,
          2: selectedState.glosa_marca,
          3: selectedState.name,
          4: selectedState.stock_producto,
          5: "S/" + (selectedState.precioventa_producto),
          6: 1,
          7: "S/" + (selectedState.precioventa_producto)
        };
        this.construccionTabla.push(datos);
        this.ActualizarDatos();
        this.DatosProducto();
        // this.DatosProductoImagen();
        $('.mostrarCalculoVenta').removeClass('d-none');

      }
      // console.log(selectedState);




    }
  }
  inputChange(elemento) {
    let cantidadEscogida = parseInt(elemento.value);
    let stock =
      elemento.parentNode.previousSibling.previousSibling.firstChild
        .textContent;
    if (parseInt(stock) < cantidadEscogida) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `La cantidad no puede ser mayor al Stock.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      elemento.classList.remove('is-valid');
      elemento.classList.add('is-invalid');
      return false;
    }


    let precio = elemento.parentNode.previousSibling.firstChild.textContent;
    precio = precio.split('S/');
    let precioVenta = parseFloat(precio[1]);
    let calculoVenta = precioVenta * cantidadEscogida;
    if (isNaN(calculoVenta)) {
      elemento.parentNode.nextSibling.firstChild.textContent = '0';
    } else {
      elemento.parentNode.nextSibling.firstChild.textContent =
        'S/' + parseFloat(calculoVenta.toString()).toFixed(2);
    }
    elemento.classList.remove('is-invalid');
    elemento.classList.add('is-valid');

    return true;
  }

  GuardaDatosProducto(id_producto, elemento, elementotarget) {
    var controlCantidad = 0;
    let datos = [];
    // $("input[type=checkbox]:checked").each(function(){
    let datosProducto = [];
    let recorrido = 0;
    // buscamos el td más cercano en el DOM hacia "arriba"
    // luego encontramos los td adyacentes a este
    datosProducto.push(id_producto);
    $(elemento).closest('td').siblings().each(function () {
      recorrido++;
      if (recorrido == 6) {
        var cantidad = $(this).find('input').val();
        if (cantidad == '' || cantidad < 0) {
          controlCantidad = 1;
          $(this).find('input').addClass('is-invalid');
        }
        datosProducto.push(cantidad);
      } else {
        datosProducto.push($(this).text());
      }
      // obtenemos el texto del td
    });
    datos.push(datosProducto);
    // });
    if (controlCantidad == 1) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Ingrese cantidad en productos señalado`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      elementotarget.currentTarget.checked = false;
      return false;
    }
    let cantidadIncorrecta = 0;
    datos.forEach((elemento) => {
      if ((parseInt(elemento[4]) < parseInt(elemento[6])) || (parseInt(elemento[6]) < 0)) {
        cantidadIncorrecta = 1;

      }
    });
    if (cantidadIncorrecta == 1) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `La cantidad ingresada no es correcta.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 4000,
      });
      elementotarget.currentTarget.checked = false;
      return false;
    }

    if (elementotarget.currentTarget.checked) {
      this.construccionTabla.push(...datos);
      this.ActualizarDatos()
    } else {
      this.construccionTabla.forEach((elemento, indice) => {
        if (elemento[0] == id_producto) {
          this.construccionTabla.splice(indice, 1);
        }
      });
      this.ActualizarDatos()
    }

    // this.construccionTabla.push(...datos);
    // console.log(this.construccionTabla);
    // this.ActualizarDatos();
    // $('.mostrarCalculoVenta').removeClass('d-none');
    // this.DatosProducto();
    // // this.DatosProductoImagen();
    // this.filtrarTabla = '';
    // //Activa el foco
    // this.myInputField.nativeElement.focus();
  }

  eliminarProducto(id_producto) {
    this.construccionTabla.forEach((elemento, indice) => {
      if (elemento[0] == id_producto) {
        this.construccionTabla.splice(indice, 1);
      }
    });
    this.ActualizarDatos();
    // this.DatosProductoImagen();
    this.DatosProducto();
  }
  ActualizarDatos() {
    let totalProducto = 0;
    this.construccionTabla.forEach((elementos) => {
      let total = elementos[7];
      total = total.split('S/');
      total = parseFloat(total[1]);
      totalProducto += total;
    });
    $('.cantidad_producto').html(this.construccionTabla.length);
    let descuento = 0;
    if ($('.descuento').val() != '') {
      descuento = $('.descuento').val();
    }
    let totalMostrar: any = parseFloat(totalProducto.toString()).toFixed(2);
    let valorMostrar = totalMostrar - descuento;
    $('.total_pagar').val(parseFloat(valorMostrar.toString()).toFixed(2));

    let pago = 0;
    if ($('.pago').val() != '') {
      pago = $('.pago').val();
      let totalmostrar: any = parseFloat(valorMostrar.toString()).toFixed(2);
      totalmostrar = pago - totalmostrar;
      $('.cambio').val(parseFloat(totalmostrar.toString()).toFixed(2));
    } else {
      $('.cambio').val(pago);
    }
  }
  CalcularPagoCambio(evento) {
    this.ActualizarDatos();
  }
  Descuento(evento) {
    this.ActualizarDatos();
  }
  inputChangeSeleccionado(evento, cantidad, id_producto) {
    let respuesta = this.inputChange(evento);
    console.log(respuesta);
    let total = evento.parentNode.nextSibling.firstChild.textContent;
    if (respuesta != false) {
      this.construccionTabla.forEach((elemento, indice) => {
        if (elemento[0] == id_producto) {
          elemento[6] = cantidad;
          elemento[7] = total;
        }
      });
    }

    this.ActualizarDatos();
  }
  NotaVenta() {
    if (this.VerificarStockProducto()) {
      Swal.fire({
        title: '<h3 style=" margin-bottom: 0px; margin-top: 18px; " >Verificar la cantidad de los productos.</h3><br>',
        showCloseButton: true,
        icon: 'error',
        //  showCancelButton: true,
        // html: '<a  href="http://localhost:4200/#/Caja"   class="btn btn-success text-white">Abrir Caja</a>',
        focusConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#fff",
        reverseButtons: true,
        confirmButtonText: 'Verificar',
        buttonsStyling: true,
        //   confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: ' Abrir Caja',
        cancelButtonAriaLabel: 'Thumbs down',
        customClass: {
          confirmButton: 'no-show',
          cancelButton: 'btn btn-outline-danger button-margin-right',
        },
        onBeforeOpen: function (ele) {
          console.log(ele);
          // $(ele).find('button.swal2-confirm.swal2-styled').toggleClass('swal2-confirm swal2-styled swal2-confirm btn btn-success')
        },
      })
      return false;
    }
    let total_pagar = parseFloat($('.total_pagar').val());
    let descuento = $('.descuento').val();
    let pago = parseFloat($('.pago').val().toString()).toFixed(2);
    let cambio = $('.cambio').val();
    if (pago === "NaN" || (total_pagar > parseFloat(pago))) {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Pago Incorrecto.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 4000,
      });
      $('.pago').addClass("is-invalid");
      return false;
    } else {
      $('.pago').removeClass("is-invalid");
    }
    Swal.fire({
      title: 'TICKET',
      html: 'Generando Ticket del Cliente...',
      text: 'Generando Ticket del Cliente...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this._NotaVenta
          .ExportarNotaVenta(
            this.token,
            this.construccionTabla,
            this.identity.sub,
            this.id_aperturar_caja,
            total_pagar,
            descuento,
            pago,
            cambio
          )
          .subscribe((respuesta) => {

            // var htmlticket = `<a style="display: none; margin-bottom: 15px;" class="btn btn-primary" id ="verTicket"  target="prevticket"  action href="http://apiventa.pe/api/VisualizarNotaVentaTicket/${respuesta}"></a>`;
            // $("#verTicket")[0].click();

            this._NotaVenta.TraerUrlPrueba(this.token, respuesta).pipe(finalize(() => {
              $('#mostrar_receta_reporte').modal('show');
              this.construccionTabla = [];
              // this.DatosProductoImagen();
              $('.mostrarCalculoVenta').addClass('d-none');
              $('.total_pagar').val('');
              $('.descuento').val('');
              $('.pago').val('');
              $('.cambio').val('');
           
              Swal.close();
              this.DatosProducto();
            })).subscribe(res => {
              var htmlticket = `<embed src="${res}" frameborder="0" width="100%" height="400px">`;
              $("#viewjs").html(htmlticket);

            })


          });
      },
    });
  }


  webSocket() {
    Pusher.logToConsole = true;
    const pusher = new Pusher('5fd4b9d2fc8f70b057a0', {
      cluster: 'us2'
    });
    const channel = pusher.subscribe('crearmarca');
    channel.bind('pusher:subscription_succeeded', function (members) {
      // alert('successfully subscribed!');
    });
    channel.bind('App\\Events\\ActualizarStockEvent', data => {
      console.log(data);
      if (data.stock) {
        this.construccionTabla.forEach((elemento, indice) => {
          data.stock.forEach(stock => {
            if (elemento[0] == stock.id_producto) {
              elemento[4] = stock.cantidad;
              if (parseInt(elemento[6]) > stock.cantidad) {
                $(`.${stock.id_producto}`).addClass("is-invalid");
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'error',
                  title: `La cantidad no puede ser mayor al Stock.`,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 3000,
                });
              }
            }
          });
        });
        this.DatosProducto();
      }
    });
  }

  WebSocketEcho() {
    this.Echo = new Echo({
      broadcaster: 'pusher',
      key: '5fd4b9d2fc8f70b057a0',
      cluster:'us2'
    });
    this.Echo.channel('crearmarca').
    listen('ActualizarStockEvent',(data:any)=>{
      console.log(data);
    })

   

  }
  webSocketPhp() {
    Pusher.logToConsole = true;
    const pusher = new Pusher('5fd4b9d2fc8f70b057a0', {
      cluster: 'us2'
    });
    const channel = pusher.subscribe('Stock');
    channel.bind('pusher:subscription_succeeded', function (members) {
      // alert('successfully subscribed!');
    });
    channel.bind('ActualizarStockEvent', data => {
      console.log(data);
      // if (data.stock) {
        this.construccionTabla.forEach((elemento, indice) => {
          data.forEach(stock => {
            if (elemento[0] == stock.id_producto) {
              elemento[4] = stock.cantidad;
              if (parseInt(elemento[6]) > stock.cantidad) {
                $(`.${stock.id_producto}`).addClass("is-invalid");
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'error',
                  title: `La cantidad no puede ser mayor al Stock.`,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 3000,
                });
              }
            }
          });
        });
        this.DatosProducto();
      // }
    });
  }

  VerificarStockProducto(): boolean {
    let respuesta = false;
    this.construccionTabla.forEach((elemento, indice) => {
      if (parseInt(elemento[6]) > parseInt(elemento[4])) {
        respuesta = true;
      }
    });
    return respuesta;
  }
}
