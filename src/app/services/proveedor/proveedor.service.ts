import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  linkApi = 'http://localhost/MVC_APIVENTA/?';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerProveedor(token):Observable<any>{
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.get(`${this.linkApi}controller=Proveedor&action=Listarproveedor`,{headers:headers})
  }
  TraerProveedorDesactivados(token):Observable<any>{
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.get(`${this.linkApi}controller=Proveedor&action=ListarproveedorDesactivados`,{headers:headers})
  }

  TraerProveedorSeleccionado(token,id_proveedor):Observable<any>{
    let dato={
      id_proveedor
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Proveedor&action=TraerProveedor`,dato,{headers})
  }
  Guardar_Editar_Proveedor(token,datos:any):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Proveedor&action=Guardar_Editar_Proveedor`,datos,{headers})
  }
  DesactivarProveedor(token,id_proveedor):Observable<any>{
    let dato={
      id_proveedor
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Proveedor&action=DesactivarProveedor`,dato,{headers})
  }
  ActivarInventario(token,id_proveedor):Observable<any>{
    let dato={
      id_proveedor
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Proveedor&action=ActivarProveedor`,dato,{headers})
  }
}
