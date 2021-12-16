import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaventaService {
  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  ExportarNotaVenta(token,construccionTabla,id_usuario,id_aperturar_caja,total_pagar,descuento,pago,cambio):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: token
    });
    let datos={
      notaVenta:JSON.stringify(construccionTabla),
      id_usuario:id_usuario,
      id_aperturar_caja:id_aperturar_caja,
      total_pagar:total_pagar,
      descuento:descuento,
      pago:pago,
      cambio:cambio,
    }

    //PRUEBA PARA EL WEBSOCKET DESDE LARAVEL
    // const formData=new FormData();
    // formData.append('notaVenta',JSON.stringify(construccionTabla));
    // formData.append('id_usuario',id_usuario);
    // formData.append('id_aperturar_caja',id_aperturar_caja);
    // formData.append('total_pagar',total_pagar);
    // formData.append('descuento',descuento);
    // formData.append('pago',pago);
    // formData.append('cambio',cambio);

    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=NotaVenta&action=GenerarNotaVenta",datos,{headers})
    // return this.httpcliente.post(this.linkApi+'ExportarNotaVenta',formData,{headers})
  }
  TraerProductoNoEscogidos(token,id_producto):Observable<any>{
    let dato={
      id_producto
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=NotaVenta&action=ListarProductoVenta",dato,{headers})
  }
  VerificarCajaAbierto(token):Observable<any>{
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.get(this.linkApi+'VerificarCajaAbierto',{headers:headers})
  }

  TraerUrlPrueba(token,pathticket):Observable<any>{
    let dato={
      pathticket
    }
    let headers=new HttpHeaders()
    .set('Content-Type','application/x-www-form-urlencoded')
    .set('Authorization',token);
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=NotaVenta&action=VisualizarNotaVentaTicket",dato,{headers})
  }
}
