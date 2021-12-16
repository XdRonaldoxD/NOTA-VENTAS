import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AperturaCajaService {

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
  TraerAperturaCaja(token,id_caja,filtro_venta):Observable<any>{
    const formData=new FormData();
    formData.append('id_caja',id_caja)
    formData.append('fecha_incio',filtro_venta.fecha_inicio)
    formData.append('fecha_fin',filtro_venta.fecha_fin)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'listarApertura',formData,{headers})
  }
  NumeroCaja(token,id_caja):Observable<any>{
    const formData=new FormData();
    formData.append('id_caja',id_caja)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'NumeroCaja',formData,{headers})
  }
  VerificarCajaAbierta(token,id_caja):Observable<any>{
    const formData=new FormData();
    formData.append('id_caja',id_caja)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'VerificarCajaAbierta',formData,{headers})
  }
  GuardarAperturaCaja(token,datos):Observable<any>{
    const formData=new FormData();
    if (datos.apertura_caja_monto_final=="null") {
      datos.apertura_caja_monto_final=null;
    }
    formData.append('id_apertura_caja',datos.id_apertura_caja);
    formData.append('id_caja',datos.id_caja);
    formData.append('id_usuario',datos.id_usuario);
    formData.append('apertura_caja_fechainicio',datos.apertura_caja_fechainicio);
    formData.append('apertura_caja_fechafin',datos.apertura_caja_fechafin);
    formData.append('apertura_caja_monto_inicial',datos.apertura_caja_monto_inicial);
    formData.append('apertura_caja_monto_final',datos.apertura_caja_monto_final);
    formData.append('apertura_caja_total_ventas',datos.apertura_caja_total_ventas);
    formData.append('apertura_caja_estado',datos.apertura_caja_estado);
    formData.append('apertura_caja_cantidad_ventas',datos.apertura_caja_cantidad_ventas);
    formData.append('apertura_caja_descuento',datos.apertura_caja_descuento_ventas);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'Guardar_Cerrar_Apertura_Caja',formData,{headers})
  }
  DesactivarMarca(token,id_marca):Observable<any>{
    
    const formData=new FormData();
    formData.append('id_marca',id_marca);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'DesactivarMarca',formData,{headers})
  }
  ActivarMarca(token,id_marca):Observable<any>{
    const formData=new FormData();
    formData.append('id_marca',id_marca);
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'ActivarMarca',formData,{headers})
  }
}
