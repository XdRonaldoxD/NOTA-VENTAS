import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerCaja(token):Observable<any>{
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.get(this.linkApi+'ListarCaja',{headers:headers})
  }
  TraerMarcasDesactivados(token):Observable<any>{
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.get(this.linkApi+'ListarMarcaDesactivados',{headers:headers})
  }

  TraerCajaSeleccionado(token,id):Observable<any>{
    const formData=new FormData();
    formData.append('id_caja',id)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'TraerDatoCaja',formData,{headers})
  }
  GuardarCaja(token,datos):Observable<any>{
    const formData=new FormData();
    formData.append('id_caja',datos.id_caja);
    formData.append('glosa_caja',datos.glosa_caja);
    formData.append('estado_caja',datos.estado_caja);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'GuardarCaja',formData,{headers})
  }
  EliminarCaja(token,id_caja):Observable<any>{
    
    const formData=new FormData();
    formData.append('id_caja',id_caja);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'EliminarCaja',formData,{headers})
  }

}
