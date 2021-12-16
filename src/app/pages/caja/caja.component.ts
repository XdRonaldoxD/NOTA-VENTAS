import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { caja_interface } from '../../interfaces/caja';
import { CajaService } from '../../services/caja/caja.service';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  numrows: any;
  paginas: any;
  filtrarTabla: any='';
  pageActual: number = 1;
  token: any;
  identity: any;
  listarCajas: any=[];
  caja:caja_interface={};
  cargando:boolean;
  validar:boolean=false;
  constructor(
    private _CajaServicio: CajaService,
    private _loginServicio: LoginService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();
    this.listarMarca();
    this.limpiar();
  }
  busqueda(evento){
    console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;

  }

  
  listarMarca() {
    this.cargando=true;
    this._CajaServicio.TraerCaja(this.token).subscribe((respuesta) => {
      this.listarCajas = respuesta;
      this.cargando=false;
    });
 
  }
  limpiar() {
    this.paginas = 5;
    this.numrows = this.paginas;
  }

  EnviarDatosCaja(DatosMarca){
    if (DatosMarca.valid) {
      this._CajaServicio.GuardarCaja(this.token,this.caja).subscribe(respuesta=>{
 
        Swal.fire({
          toast:true,
          position: 'top',
          icon: 'success',
          title: `Caja ${respuesta} Correctamente`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
        this.listarMarca();
      })
      this.caja={};
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
  AgregarCaja(){
    $('#modal_marca').modal('show');
  }
  AperturaCaja(id_caja){
    this._route.navigate(["/AperturaCaja/" + id_caja]);
  }
  EditarMarca(id_caja){
    this._CajaServicio.TraerCajaSeleccionado(this.token,id_caja).subscribe(respuesta=>{
      this.caja=respuesta;
    })
    $('#modal_marca').modal('show');
  }
 
  EliminarCaja(id_caja,glosa_marca){
    Swal.fire({
      title: `¿Esta seguro de eliminar la caja ${glosa_marca}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._CajaServicio.EliminarCaja(this.token,id_caja)
        .subscribe(respuesta=>{
          if (respuesta=="Eliminado") {
            Swal.fire(
              `Caja ${respuesta}!`,
              'Eliminado.',
              'success'
            )
            this.listarMarca();
          }else{
            Swal.fire(
              `La caja ya tiene apertura.`,
              'No se puede eliminar.',
              'warning'
            )
          }
      
        });
   
        
      }
    })
  }



  cerrarModal(){
    this.caja={};
  }
}
