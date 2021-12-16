import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../services/marca/marca.service';
import { LoginService } from '../../services/login/login.service';
import { marca_interface } from '../../interfaces/marca';
import Swal from 'sweetalert2';
// import Pusher from 'pusher-js';
import { Subject, Observable } from 'rxjs';
// import { PusherService } from '../../services/pusher/pusher.service';

declare var $: any;
@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
})
export class MarcaComponent implements OnInit {
  numrows: any;
  numrows2: any;
  paginas: any;
  paginas2: any;
  filtrarTabla: any = '';
  filtrarTabla2: any = '';
  pageActual: number = 1;
  pageActual2: number = 1;
  token: any;
  identity: any;
  listarMarcas: any = [];
  listarDesactivadosMarcas: any = [];
  marca: marca_interface = {};
  cargando: boolean;
  cargando2: boolean;
  validar: boolean = false;

  // private subject: Subject<Feed> = new Subject<Feed>();
  dtOptions: DataTables.Settings = {};
  constructor(
    private _MarcaServicio: MarcaService,
    private _loginServicio: LoginService,
    // private pusherService: PusherService
  ) {
    // this.webSocket();
    // this.pusherService.channel.bind('.CrearMarcaEvent', data => {
    //   console.log("socket", data);
    // });
  }

  ngOnInit(): void {




    this.token = this._loginServicio.getToken();
    this.listarMarca();
    this.dtOptions[0] = {
      pagingType: 'full_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json",
      },
      aLengthMenu: [
        [5, 10, 50],
        [5, 10, 50]
      ],
      pageLength: 5,
      destroy: true,
      responsive: true,
      order:false
    };
  

    this.listarMarcaDesactivados();
    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json",
      },
      aLengthMenu: [
        [5, 10, 50],
        [5, 10, 50]
      ],
      pageLength: 5,
      destroy: true,
      responsive: true,
      order:false
    };


 

  }
  // webSocket() {
  //   Pusher.logToConsole = true;
  //   const pusher = new Pusher('5fd4b9d2fc8f70b057a0', {
  //     cluster: 'us2'
  //   });
  //   const channel = pusher.subscribe('crearmarca');
  // //   channel.bind('pusher:subscription_succeeded', function(members) {
  // //     // alert('successfully subscribed!');
  // //  });
  //   channel.bind('App\\Events\\CrearMarcaEvent',  data => {
  //     console.log(data.marca.glosa_marca);
  //   });
  // }
  busqueda(evento) {
    console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;

  }
  cambio2(evento) {
    this.numrows2 = evento;

  }

  listarMarca() {
    this.cargando = true;
    this._MarcaServicio.TraerMarcas(this.token).subscribe((respuesta) => {
      this.listarMarcas = respuesta;
      this.cargando = false;
    });

  }
  listarMarcaDesactivados() {
    this.cargando2 = true;
    this._MarcaServicio.TraerMarcasDesactivados(this.token).subscribe((respuesta) => {
      this.listarDesactivadosMarcas = respuesta;
      this.cargando2 = false;
    });

  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }
  limpiar2() {
    this.paginas2 = 5;
    this.numrows2 = this.paginas2;
  }
  EnviarDatosMarca(DatosMarca) {
    console.log(DatosMarca.valid);
    if (DatosMarca.valid) {
      this._MarcaServicio.GuardarMarca(this.token, this.marca).subscribe(respuesta => {
        Swal.fire({
          toast: true,
          position: 'top',
          icon: 'success',
          title: `Marca ${respuesta} Correctamente`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })

        this.listarMarca();
        this.listarMarcaDesactivados();

      })
      this.marca = {};
      this.validar = false;
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
        timer: 3000
      })
    }
  }
  AgregarMarca() {
    $(".texto_marca").html('Nueva Marca');
    $('#modal_marca').modal('show');
  }
  EditarMarca(id_marca) {
    $(".texto_marca").html('Editar Marca');
    this._MarcaServicio.TraerMarcaSeleccionado(this.token, id_marca).subscribe(respuesta => {
      this.marca = respuesta;
    })
    $('#modal_marca').modal('show');
  }

  DesactivarMarca(id_marca, glosa_marca) {
    Swal.fire({
      title: `¿Esta seguro de desactivar la marca ${glosa_marca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._MarcaServicio.DesactivarMarca(this.token, id_marca)
          .subscribe(respuesta => {
            Swal.fire(
              `Marca ${respuesta}!`,
              'Desactivado.',
              'success'
            )
            this.listarMarca();
            this.listarMarcaDesactivados();
          });


      }
    })
  }

  ActivarMarca(id_marca, glosa_marca) {
    Swal.fire({
      title: `¿Esta seguro de Activar la marca ${glosa_marca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._MarcaServicio.ActivarMarca(this.token, id_marca)
          .subscribe(respuesta => {
            Swal.fire(
              `Marca ${respuesta}!`,
              'Activado.',
              'success'
            )
            setTimeout(() => {
              this.listarMarcaDesactivados();
              this.listarMarca();
            }, 1000);

          });


      }
    })
  }

  cerrarModal() {
    this.marca = {};
  }


}
