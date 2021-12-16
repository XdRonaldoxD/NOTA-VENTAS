import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Inventario_interface } from '../../interfaces/inventario';
import { LoginService } from '../../services/login/login.service';
import { InventarioService } from '../../services/inventario/inventario.service';
declare var $:any;
@Component({
  selector: 'app-tipo-inventario',
  templateUrl: './tipo-inventario.component.html',
  styleUrls: ['./tipo-inventario.component.css']
})
export class TipoInventarioComponent implements OnInit {

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
  listarInventario: any=[];
  listarDesactivadosInventario: any=[];
  inventario:Inventario_interface={};
  cargando:boolean;
  cargando2:boolean;
  validar:boolean=false;
  constructor(
    private _InventarioServicio: InventarioService,
    private _loginServicio: LoginService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.DatosInventario();
    this.limpiar();
    
    this.DatosInventarioDesactivados();
    this.limpiar2();
  }
  busqueda(evento){
    console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;

  }
 cambio2(evento) {
    this.numrows2 = evento;

  }
  
  DatosInventario() {
    this.cargando=true;
    this._InventarioServicio.TraerInventario(this.token).subscribe((respuesta) => {
      this.listarInventario = respuesta;
      this.cargando=false;
    });
 
  }
  DatosInventarioDesactivados() {
    this.cargando2=true;
    this._InventarioServicio.TraerInventarioDesactivados(this.token).subscribe((respuesta) => {
      this.listarDesactivadosInventario = respuesta;
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
  EnviarDatosInventario(DatosInventario){
    console.log( this.inventario);
   
    if (DatosInventario.valid) {
      this._InventarioServicio.Guardar_Editar_Inventario(this.token,this.inventario).subscribe(respuesta=>{
        this.DatosInventario();
        this.limpiar();
        this.DatosInventarioDesactivados();
        this.limpiar2();
        Swal.fire({
          toast:true,
          position: 'top',
          icon: 'success',
          title: `Inventario ${respuesta} Correctamente`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
      })
      this.inventario={};
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
  AgregarInventario(){
    $(".texto_inventario").html("Agregar Inventario");
    $('#modal_marca').modal('show');
  }
  EditarInventario(id_iventario){
    $(".texto_inventario").html("Editar Inventario");
    this._InventarioServicio.TraerInventarioSeleccionado(this.token,id_iventario).subscribe(respuesta=>{
      this.inventario=respuesta;
    
    })
    $('#modal_marca').modal('show');
  }

  DesactivarInventario(id_inventario,glosa_inventario){
    Swal.fire({
      title: `¿Esta seguro de desactivar el inventario ${glosa_inventario}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._InventarioServicio.DesactivarInventario(this.token,id_inventario)
        .subscribe(respuesta=>{
          Swal.fire(
            `Inventario ${respuesta}!`,
            'Desactivado.',
            'success'
          )
          this.DatosInventario();
          this.limpiar();
          this.DatosInventarioDesactivados();
          this.limpiar2();
          
        });
    
      }
    })
  }

  ActivarInventario(id_inventario,glosa_inventario){
    Swal.fire({
      title: `¿Esta seguro de Activar el inventario ${glosa_inventario}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._InventarioServicio.ActivarInventario(this.token,id_inventario)
        .subscribe(respuesta=>{
          Swal.fire(
            `Inventario ${respuesta}!`,
            'Activado.',
            'success'
          )
          this.DatosInventario();
          this.limpiar();
          this.DatosInventarioDesactivados();
          this.limpiar2();
        });
     
        
      }
    })
  }

  cerrarModal(){
    this.inventario={};
  }


}
