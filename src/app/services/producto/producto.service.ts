import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerTipoProducto(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get('http://localhost/MVC_APIVENTA/?controller=Producto&action=ListarTipoProducto', { headers: headers })
  }

  TraerProducto(token, filtro_producto): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=ListarProducto', filtro_producto, { headers })
  }
  TraerProductoDesactivados(token, filtro_producto): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=ListarProductoDesactivados', filtro_producto, { headers })
  }
  TraerPresentacion(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get('http://localhost/MVC_APIVENTA/?controller=Unidad&action=ListarPresentacion', { headers: headers })
  }
  TraerTipoConcentracion(token, id_unidad): Observable<any> {
    let datos={
      id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=ListarTipoConcentracion', datos, { headers })
  }




  TraerProductoSeleccionado(token, id_producto): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=TraerProducto', id_producto, { headers })
  }
  TraerHistorialProducto(token, id_producto): Observable<any> {
    const formData = new FormData();
    formData.append('id_producto', id_producto)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=TraerHistorialProducto', formData, { headers })
  }
  GuardarHistorial(token, historial): Observable<any> {
    console.log(historial);
    const formData = new FormData();
    formData.append('id_producto', historial.id_producto)
    formData.append('id_usuario', historial.id_usuario)
    formData.append('tipo_movimiento', historial.tipo_movimiento)
    formData.append('movimiento_historial', historial.movimiento_historial)
    formData.append('stock_final_producto', historial.stock_final_producto)
    formData.append('comentario_producto_historial', historial.comentario_producto_historial)
    formData.append('preciocosto_producto', historial.preciocosto_producto)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=GuardarHistorial', formData, { headers })
  }
  TraerProductoProveedor(token, id_proveedor): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Listar_Producto_Proveedor', id_proveedor, { headers })
  }
  Listar_Producto_Tipo_inventario(token, id_tipo_inventario): Observable<any> {
    const formData = new FormData();
    formData.append('id_tipo_inventario', id_tipo_inventario);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi + 'Listar_Producto_Tipo_inventario', formData, { headers })
  }
  Listar_Producto_Tipo_Producto(token, id_tipo_producto): Observable<any> {

    let datos={
      id_tipo_producto
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Listar_Producto_Tipo_Producto', datos, { headers })
  }

  Listar_Producto_Marca(token, id_marca): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Listar_Producto_Marca', id_marca, { headers })
  }

  Listar_Producto_unidad(token, id_unidad): Observable<any> {
    let dato={
      id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Listar_Producto_unidad', dato, { headers })
  }

  Listar_Producto_concentracion(token, id_unidad): Observable<any> {
    let dato={
      id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Listar_Producto_concentracion', dato, { headers })
  }

  Guardar_Editar_Producto(token, datos: any): Observable<any> {
    let dato={
    id_producto:(datos.id_producto) ? datos.id_producto : null ,
    id_tipo_producto:datos.id_tipo_producto? datos.id_tipo_producto : null ,
    id_tipo_concentracion:datos.id_tipo_concentracion? datos.id_tipo_concentracion : null ,
    id_tipo_inventario:datos.id_tipo_inventario? datos.id_tipo_inventario : null ,
    id_unidad:datos.id_unidad? datos.id_unidad : null ,
    id_marca:datos.id_marca? datos.id_marca : null ,
    id_proveedor:datos.id_proveedor? datos.id_proveedor : null ,
    codigo_producto:datos.codigo_producto? datos.codigo_producto : null ,
    glosa_producto:datos.glosa_producto? datos.glosa_producto : null ,
    detalle_producto:datos.detalle_producto? datos.detalle_producto : null ,
    multidosis_producto:datos.multidosis_producto? datos.multidosis_producto : null ,
    dosis_producto:datos.dosis_producto? datos.dosis_producto : null ,
    concentracion_producto:datos.concentracion_producto? datos.concentracion_producto : null ,
    cantidad_producto:datos.cantidad_producto? datos.cantidad_producto : null ,
    stock_producto:datos.stock_producto? datos.stock_producto : null ,
    precioventa_producto:datos.precioventa_producto? datos.precioventa_producto : null ,
    preciocosto_producto:datos.preciocosto_producto? datos.preciocosto_producto : null ,
    contenidomultidosis_producto:datos.contenidomultidosis_producto? datos.contenidomultidosis_producto : null ,
    vigente_producto:datos.vigente_producto    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Producto&action=Guardar_Editar_Producto', dato, { headers })
  }
  DesactivarProducto(token, id_producto): Observable<any> {
    const formData = new FormData();
    formData.append('id_producto', id_producto);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi + 'DesactivarProducto', formData, { headers })
  }
  ActivarProducto(token, id_producto): Observable<any> {
    const formData = new FormData();
    formData.append('id_producto', id_producto);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi + 'ActivarProducto', formData, { headers })
  }
}
