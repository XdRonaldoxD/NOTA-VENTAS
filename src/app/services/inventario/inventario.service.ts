import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerInventario(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get('http://localhost/MVC_APIVENTA/?controller=Inventario&action=ListarInventario', { headers: headers })
  }
  TraerInventarioDesactivados(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get('http://localhost/MVC_APIVENTA/?controller=Inventario&action=ListarInventarioDesactivados', { headers: headers })
  }

  TraerInventarioSeleccionado(token, id_tipo_inventario): Observable<any> {
    let dato = {
      id_tipo_inventario
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Inventario&action=TraerDatoInventario', dato, { headers })
  }
  Guardar_Editar_Inventario(token, datos: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Inventario&action=Guardar_Editar_Inventario', datos, { headers })
  }
  DesactivarInventario(token, id_tipo_inventario): Observable<any> {
    let dato = {
      id_tipo_inventario
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Inventario&action=DesactivarInventario', dato, { headers })
  }
  ActivarInventario(token, id_tipo_inventario): Observable<any> {
    let dato = {
      id_tipo_inventario
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post('http://localhost/MVC_APIVENTA/?controller=Inventario&action=ActivarInventario', dato, { headers })
  }
}
