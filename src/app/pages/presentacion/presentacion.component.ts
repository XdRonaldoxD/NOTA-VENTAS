import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { unidad_interface, tipo_concentracion_interface } from '../../interfaces/unidad';
import { LoginService } from '../../services/login/login.service';
import { PresentacionService } from '../../services/presentacion/presentacion.service';
declare var $:any;
@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
  numrows: any;
  numrows2: any;
  paginas: any;
  paginas2: any;
  filtrarTabla: any='';
  filtrarTabla2: any='';
  pageActual: number = 1;
  pageActual2: number = 1;
  token: any;
  identity: any;
  listarPresentacion: any=[];
  listarDesactivadosPresentacion: any=[];
  listarConcentracion:any=[];
  unidad:unidad_interface={};
  tipo_concentracion:tipo_concentracion_interface={};
  cargando:boolean;
  cargando2:boolean;
  validar:boolean=false;
  validarConcentracion:boolean=false;
  dtOptions: DataTables.Settings = {};
  constructor(
    private _PresentacionServicio: PresentacionService,
    private _loginServicio: LoginService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.listarPresentaciones();
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
    
    this.listarpresentacionDesactivados();
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
  busqueda(evento){
    // console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;

  }
 cambio2(evento) {
    this.numrows2 = evento;

  }
  
  listarPresentaciones() {
    this.cargando=true;
    this._PresentacionServicio.TraerPresenteacion(this.token).subscribe((respuesta) => {
      this.listarPresentacion = respuesta;
      this.cargando=false;
    });
 
  }
  listarpresentacionDesactivados() {
    this.cargando2=true;
    this._PresentacionServicio.TraerPresenteacionDesactivados(this.token).subscribe((respuesta) => {
      this.listarDesactivadosPresentacion = respuesta;
      this.cargando2=false;
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
  EnviarDatosUnidad(DatosUnidad){
    if (DatosUnidad.valid) {
      this._PresentacionServicio.GuardarUnidad(this.token,this.unidad).subscribe(respuesta=>{
        if (respuesta=="Creado") {
          Swal.fire({
            toast:true,
            position: 'top',
            icon: 'success',
            title: `Se Registro correctamente la Presentacion.`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
          })
        }else{
          Swal.fire({
            toast:true,
            position: 'top',
            icon: 'success',
            title: `Se Edito correctamente la Presentacion.`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
          })
        }
        this.listarPresentaciones();
        this.listarpresentacionDesactivados();
      })
      this.unidad={};
      this.validar=false;
      $('#modal_marca').modal('hide');
    }else{
      this.validar=true;
      Swal.fire({
        toast:true,
        position: 'top',
        icon: 'error',
        title: `Debe llenar el campo requerido.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
      })
    }
  }
  AgregarMarca(){
    $(".titulo_presentacion").html('Nueva Presentación');
    $('#modal_marca').modal('show');
  }
  EditaPresentacion(id_unidad){
    this._PresentacionServicio.TraerUnidadSeleccionado(this.token,id_unidad).subscribe(respuesta=>{
      this.unidad=respuesta;
    })
    $(".titulo_presentacion").html('Editar Presentación');
    $('#modal_marca').modal('show');
  }
  AsignarConcentracion(id_unidad,glosa_presentacion){
    this.tipo_concentracion.id_unidad=id_unidad;
    $("#presentacion").html(glosa_presentacion);
    this.listarConcentraciones(id_unidad);
    $('#detallePresentacion').modal('show');

  }
  listarConcentraciones(id_unidad){
    this._PresentacionServicio.TraerTipoConcentracion(this.token,id_unidad).subscribe(respuesta=>{
      this.listarConcentracion=respuesta;
      console.log(this.listarConcentracion);
    })
  }
  EnviarDatosConcentracion(datos){
    if (datos.valid) {
      this._PresentacionServicio.GuardarTipoConcentracion(this.token,this.tipo_concentracion).subscribe(respuesta=>{
        if (respuesta=="Creado") {
          Swal.fire({
            toast:true,
            position: 'top',
            icon: 'success',
            title: `Se Registro correctamente la concentración.`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
          })
        }else{
          Swal.fire({
            toast:true,
            position: 'top',
            icon: 'success',
            title: `Se Edito correctamente la concentración.`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
          })

        }
      })
      $("#btn-save").html('AGREGAR CONCENTRACION');
      $(".cancelar").addClass('d-none');
      setTimeout(() => {
        this.listarConcentraciones(this.tipo_concentracion.id_unidad);
      }, 1000);
   
      this.validarConcentracion=false;
      datos.reset();
    }else{
      this.validarConcentracion=true;
      Swal.fire({
        toast:true,
        position: 'top',
        icon: 'error',
        title: `Debe llenar el campo requerido.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
      })
    }
  }
  EditarConcentracion(id_tipo_concentracion){
    this._PresentacionServicio.TraeridConcentracion(this.token,id_tipo_concentracion).subscribe(respuesta=>{
      this.tipo_concentracion=respuesta;
      $("#btn-save").html('EDITAR CONCENTRACION');
      $(".cancelar").removeClass('d-none');
    })
  }
  EliminarConcentracion(id_tipo_concentracion){
    this._PresentacionServicio.EliminaridConcentracion(this.token,id_tipo_concentracion).subscribe(respuesta=>{
      if (respuesta=="Eliminado") {
        Swal.fire({
          toast:true,
          position: 'top',
          icon: 'success',
          title: `Se Elimino correctamente la concentración.`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
        this.listarConcentraciones(this.tipo_concentracion.id_unidad);
      }else{
        Swal.fire(
          'No se puede eliminar, ya esta asociado al producto',
          '',
          'error'
        )
      }
    })
    
  }
  CancelarConcentracion(){
    $("#btn-save").html('AGREGAR CONCENTRACION');
    $(".cancelar").addClass('d-none');
    this.tipo_concentracion.id_tipo_concentracion=null;
    this.tipo_concentracion.glosa_tipo_concentracion=null;
    this.tipo_concentracion.orden_tipo_concentracion=null;
    this.tipo_concentracion.vigente_tipo_concentracion=null;
    console.log(this.tipo_concentracion);
  }
 
  DesactivarPresentacion(id_unidad,glosa_unidad){
    Swal.fire({
      title: `¿Esta seguro de desactivar la presentación ${glosa_unidad}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._PresentacionServicio.DesactivarPresentacion(this.token,id_unidad)
        .subscribe(respuesta=>{
          Swal.fire(
            `Presentación ${respuesta}!`,
            'Desactivado.',
            'success'
          )
          this.listarPresentaciones();
          this.listarpresentacionDesactivados();
        });
   
        
      }
    })
  }

  ActivarPresentacion(id_presentacion,glosa_presentacion){
    Swal.fire({
      title: `¿Esta seguro de Activar la presentación ${glosa_presentacion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._PresentacionServicio.ActivarPresentacion(this.token,id_presentacion)
        .subscribe(respuesta=>{
          Swal.fire(
            `Presentación ${respuesta}!`,
            'Activado.',
            'success'
          )
            this.listarpresentacionDesactivados();
            this.listarPresentaciones();
        });

        
      }
    })
  }

  cerrarModal(){
    this.unidad={};
  }


}
