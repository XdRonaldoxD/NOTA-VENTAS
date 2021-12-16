import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { proveedor_interface } from '../../interfaces/proveedor';
import { LoginService } from '../../services/login/login.service';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
declare var $:any;

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  public ckeConfig = {
		toolbar: [
			[ 'Source' ],
			[ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'Bold', 'Italic' ],
			[ 'Undo', 'Redo' ]
		]
	}
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
  listaProveedor: any=[];
  listarDesactivadosProveedor: any=[];
  proveedor:proveedor_interface={};
  cargando:boolean;
  cargando2:boolean;
  validar:boolean=false;
  constructor(
    private _ProveedorServicio: ProveedorService,
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
    this._ProveedorServicio.TraerProveedor(this.token).subscribe((respuesta) => {
      this.listaProveedor = respuesta;
      this.cargando=false;
    });
 
  }
  DatosInventarioDesactivados() {
    this.cargando2=true;
    this._ProveedorServicio.TraerProveedorDesactivados(this.token).subscribe((respuesta) => {
      this.listarDesactivadosProveedor = respuesta;
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
  EnviarDatosProveedor(DatosInventario){
    if (DatosInventario.valid) {
      this._ProveedorServicio.Guardar_Editar_Proveedor(this.token,this.proveedor).subscribe(respuesta=>{
        Swal.fire({
          toast:true,
          position: 'top',
          icon: 'success',
          title: `Proveedor ${respuesta} Correctamente`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
        this.DatosInventario();
        this.DatosInventarioDesactivados();
      })
      this.proveedor={};
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
    $('#modal_marca').modal('show');
  }
  EditarProveedor(id_proveedor){
    this._ProveedorServicio.TraerProveedorSeleccionado(this.token,id_proveedor).subscribe(respuesta=>{
      this.proveedor=respuesta;
    })
    $('#modal_marca').modal('show');
  }

  DesactivarProveedor(id_proveedor,glosa_proveedor){
    Swal.fire({
      title: `¿Esta seguro de desactivar el Proveedor ${glosa_proveedor}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._ProveedorServicio.DesactivarProveedor(this.token,id_proveedor)
        .subscribe(respuesta=>{
          Swal.fire(
            `Proveedor ${respuesta}!`,
            'Desactivado.',
            'success'
          )
          // setTimeout(() => {
            this.DatosInventario();
            this.DatosInventarioDesactivados();
          // }, 1500);

        });
 
        
      }
    })
  }

  ActivarInventario(id_proveedor,glosa_proveedor){
    Swal.fire({
      title: `¿Esta seguro de Activar el proveedor ${glosa_proveedor}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._ProveedorServicio.ActivarInventario(this.token,id_proveedor)
        .subscribe(respuesta=>{
          Swal.fire(
            `Proveedor ${respuesta}!`,
            'Activado.',
            'success'
          )
          // setTimeout(() => {
            this.DatosInventario();
            this.DatosInventarioDesactivados();
          // }, 1500);

        });

        
      }
    })
  }

  cerrarModal(){
    this.proveedor={};
  }

}
