import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { ProductoService } from '../../services/producto/producto.service';
import {
  producto_filtro,
  producto_historial_interface,
  producto_interface,
  producto_interface_edit,
} from '../../interfaces/producto';
import { ProveedorService } from '../../services/proveedor/proveedor.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { MarcaService } from '../../services/marca/marca.service';
import { element } from 'protractor';
declare var $: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public ckeConfig = {
    toolbar: [
      ['Source'],
      ['Styles', 'Format', 'Font', 'FontSize'],
      ['Bold', 'Italic'],
      ['Undo', 'Redo'],
    ],
  };
  glosa_concentracion: any = '';
  glosa_concentracion_edit: any = '';
  numrows: any;
  numrows2: any;
  numrows3: any;
  paginas: any;
  paginas2: any;
  paginas3: any;
  filtrarTabla: any = '';
  filtrarTabla2: any = '';
  filtrarTabla3: any = '';
  pageActual: number = 1;
  pageActual2: number = 1;
  pageActual3: number = 1;
  token: any;
  identity: any;
  listaProducto: any = [];
  listaTipoProducto: any = [];
  listarDesactivadosProducto: any = [];
  producto: producto_interface = {};
  producto_edit: producto_interface_edit = {};
  producto_historial: producto_historial_interface = {};
  producto_filtro: producto_filtro = {};
  listaProveedor: any = [];
  listarInventario: any = [];
  listarMarcas: any = [];
  listaPresentacion: any = [];
  cargando: boolean;
  cargando2: boolean;
  validar: boolean = false;
  validarStock: boolean = false;
  historialProducto: any;
  listarProveedores: any = [];
  constructor(
    private _ProductoServicio: ProductoService,
    private _loginServicio: LoginService,
    private _ProveedorServicio: ProveedorService,
    private _InventarioServicio: InventarioService,
    private _MarcaServicio: MarcaService
  ) { }

  ngOnInit(): void {
 

    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();



    this.inicializarDatosFiltro();
    this.BuscarProducto();
    this.limpiar();
    this.limpiar2();
    this.limpiar3();
  }
  BuscarProducto() {
    this.DatosProducto();
    this.DatosProductoDesactivados();

  }
  inicializarDatosFiltro() {
    this.DatosProveedor();
    this.DatosInventarios();
    this.DatosTipoProductos();
    this.listarMarca();
    this.listarPresentacion();
    this.producto_filtro.codigo_filtro = "";
    this.producto_filtro.nombre_produc_filtro = "";
    this.producto_filtro.producto_inventario_filtro = "";
    this.producto_filtro.producto_tipo_filtro = "";
  }
  busqueda(evento) {
    console.log(evento);
  }
  cambio(evento) {
    this.numrows = evento;
  }
  cambio2(evento) {
    this.numrows2 = evento;
  }
  cambio3(evento) {
    this.numrows3 = evento;
  }
  DatosProveedor() {
    this._ProveedorServicio
      .TraerProveedor(this.token)
      .subscribe((respuesta) => {
        this.listaProveedor = respuesta;
      });
  }
  DatosInventarios() {
    this._InventarioServicio
      .TraerInventario(this.token)
      .subscribe((respuesta) => {
        this.listarInventario = respuesta;
      });
  }
  DatosTipoProductos() {
    this._ProductoServicio
      .TraerTipoProducto(this.token)
      .subscribe((respuesta) => {
        this.listaTipoProducto = respuesta;
      });
  }
  listarMarca() {
    this._MarcaServicio.TraerMarcas(this.token).subscribe((respuesta) => {
      this.listarMarcas = respuesta;
    });
  }
  listarPresentacion() {
    this._ProductoServicio
      .TraerPresentacion(this.token)
      .subscribe((respuesta) => {
        this.listaPresentacion = respuesta;
      });
  }

  tipo_concentracion(id_unidad: any) {
    console.log(id_unidad);
    this._ProductoServicio
      .TraerTipoConcentracion(this.token, id_unidad)
      .subscribe((respuesta) => {
        console.log(respuesta);
        let html =
          '<option value="" selected>Seleccione Tipo de Concentración</option>';
        respuesta.forEach((element) => {
          html += `<option value="${element.id_tipo_concentracion}">${element.glosa_tipo_concentracion}</option>`;
        });
        $('.tipo_concentracion').html(html);
      });
  }
  glosa_concentracion_text() {
    let texto = $(
      'select[name="producto_concentracion"] option:selected'
    ).text();
    if (texto != 'Seleccione Tipo de Concentración') {
      this.glosa_concentracion = '(' + texto + ')';
    } else {
      this.glosa_concentracion = '';
    }
  }

  glosa_concentracion_text_edit() {
    let texto = $(
      'select[name="producto_concentracion_edit"] option:selected'
    ).text();
    if (texto != 'Seleccione Tipo de Concentración') {
      this.glosa_concentracion_edit = '(' + texto + ')';
    } else {
      this.glosa_concentracion_edit = '';
    }
  }

  DatosProducto() {
    this.cargando = true;
    this._ProductoServicio.TraerProducto(this.token, this.producto_filtro).subscribe((respuesta) => {
      this.listaProducto = respuesta;
      this.cargando = false;
    });
  }
  DatosProductoDesactivados() {
    this.cargando2 = true;
    this._ProductoServicio
      .TraerProductoDesactivados(this.token, this.producto_filtro)
      .subscribe((respuesta) => {
        this.listarDesactivadosProducto = respuesta;
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
  limpiar3() {
    this.paginas3 = 5;
    this.numrows3 = this.paginas3;
  }

  EnviarDatosProductoEditado(DatosProducto) {
    console.log(DatosProducto.valid);
    if (DatosProducto.valid) {
      this._ProductoServicio
        .Guardar_Editar_Producto(this.token, this.producto_edit)
        .subscribe((respuesta) => {
          this.DatosProducto();
          this.DatosProductoDesactivados();
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: `Producto ${respuesta} Correctamente`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
        });
      this.producto = {};
      this.validar = false;
      $('#modal_edit').modal('hide');
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

  EnviarDatosProducto(DatosProducto) {
    if (DatosProducto.valid) {
      this._ProductoServicio
        .Guardar_Editar_Producto(this.token, this.producto)
        .subscribe((respuesta) => {
          this.DatosProducto();
          this.DatosProductoDesactivados();
          Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: `Producto ${respuesta} Correctamente`,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
          });
        });
      this.producto = {};
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
        timer: 3000,
      });
    }
  }
  AgregarProducto() {
    this.producto = {};
    this.producto.id_proveedor = '';
    this.producto.id_tipo_inventario = '';
    this.producto.id_tipo_producto = '';
    this.producto.id_marca = '';
    this.producto.id_unidad = '';
    this.producto.id_tipo_concentracion = '';
    $('#modal_marca').modal('show');
    let html=` <option value="" hidden>Seleccione Tipo de Concentración</option>`;
    $(".tipo_concentracion").html(html);
    // $(".laboratorio").select2({
    //   placeholder: 'Select an option',
    //   dropdownParent: $("#modal_marca"),
    //   width:"100%"
    //   });
    //   $(".inventario").select2({
    //     placeholder: 'Select an option',
    //     dropdownParent: $("#modal_marca"),
    //     width:"100%"
    //     });
  }
  EditarProducto(id_producto) {
    this._ProductoServicio
      .TraerProductoSeleccionado(this.token, id_producto)
      .subscribe((respuesta) => {
        this.producto_edit = respuesta;
        //PROVEEDOR
        $(".producto_proveedor_edit").val(this.producto_edit.id_proveedor).change();
        $(".clase_tipo_inventario").val(this.producto_edit.id_tipo_inventario).change();
        $(".clase_tipo_producto").val(this.producto_edit.id_tipo_producto).change();
        $(".clase_marca").val(this.producto_edit.id_marca).change();
        $(".clase_unidad").val(this.producto_edit.id_unidad).change();
        

 

        // TIPO CONCENTRACION-UNIDAD
        this._ProductoServicio
          .Listar_Producto_concentracion(this.token, this.producto_edit.id_unidad)
          .subscribe((res) => {
            let tipo_concentracion = '';
            res.forEach((element) => {
              if (
                element.id_tipo_concentracion ==
                this.producto_edit.id_tipo_concentracion
              ) {
                tipo_concentracion += `<option selected value="${element.id_tipo_concentracion}">${element.glosa_tipo_concentracion}</option>`;
                this.glosa_concentracion_edit =
                  '(' + element.glosa_tipo_concentracion + ')';
              } else {
                tipo_concentracion += `<option value="${element.id_tipo_concentracion}">${element.glosa_tipo_concentracion}</option>`;
              }
            });
            $('.tipo_concentracion').html(tipo_concentracion);
          });
      });

    $('#modal_edit').modal('show');
  }

  DesactivarProducto(id_producto, glosa_producto) {
    Swal.fire({
      title: `¿Esta seguro de desactivar el Producto ${glosa_producto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.value) {
        this._ProductoServicio
          .DesactivarProducto(this.token, id_producto)
          .subscribe((respuesta) => {
            Swal.fire(`Producto ${respuesta}!`, 'Desactivado.', 'success');
            this.DatosProducto();
            this.DatosProductoDesactivados();
          });
      }
    });
  }

  ActivarProducto(id_producto, glosa_producto) {
    Swal.fire({
      title: `¿Esta seguro de Activar el producto ${glosa_producto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.value) {
        this._ProductoServicio
          .ActivarProducto(this.token, id_producto)
          .subscribe((respuesta) => {
            Swal.fire(`Producto ${respuesta}!`, 'Activado.', 'success');
            this.DatosProducto();
            this.limpiar();
            this.DatosProductoDesactivados();
            this.limpiar2();
          });
      }
    });
  }

  GestionarStock(id_producto) {
    this.producto_historial = {};
    this.producto_historial.tipo_movimiento = '';
    this._ProductoServicio
      .TraerProductoSeleccionado(this.token, id_producto)
      .subscribe((respuesta) => {
        this.producto = respuesta;
      });
    $('#gestionar-stock-modal').modal('show');
  }
  CalcularCantidad() {
    let calculo_cant;
    switch (this.producto_historial.tipo_movimiento) {
      case 'Añadir':
        calculo_cant =
          parseInt(this.producto_historial.movimiento_historial) +
          parseInt(this.producto.stock_producto);
        break;
      case 'Quitar':
        calculo_cant =
          parseInt(this.producto.stock_producto) -
          parseInt(this.producto_historial.movimiento_historial);
        break;
      default:
        calculo_cant = parseInt(this.producto.stock_producto);
        break;
    }
    this.producto_historial.stock_final_producto = calculo_cant;
  }
  GuardarHistorial(datos) {
    if (datos.valid) {
      if (this.producto_historial.stock_final_producto >= 0) {
        this.producto_historial.id_producto = this.producto.id_producto;
        this.producto_historial.id_usuario = this.identity.sub;
        this._ProductoServicio
          .GuardarHistorial(this.token, this.producto_historial)
          .subscribe((respuesta) => {
            if (respuesta == 'creado') {
              Swal.fire({
                toast: true,
                position: 'top',
                icon: 'success',
                title: `Stock Actualizado Correctamente`,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
            }
            this.DatosProducto();
            this.limpiar();
            this.DatosProductoDesactivados();
            this.limpiar2();
            this.cerrarModal();
          });
        $('#gestionar-stock-modal').modal('hide');
        this.validarStock = false;
      } else {
        Swal.fire({
          toast: true,
          position: 'top',
          icon: 'error',
          title: `El Stock Final no debe ser Negativo.`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
      }
    } else {
      this.validarStock = true;
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Debe Ingresar los Campos`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  }
  HistorialProducto(id_producto) {
    this.historialProducto = [];
    this._ProductoServicio
      .TraerHistorialProducto(this.token, id_producto)
      .subscribe((respuesta) => {
        this.historialProducto = respuesta;
      });
    $('#historial-producto').modal('show');
  }
  cerrarModal() {
    this.producto = {};
    $('.tipo_concentracion').html(
      '<option value="" selected>Seleccione Tipo de Concentración</option>'
    );
  }
}
