import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaventadetalleService {
  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  ListarNotaVenta(token,filtro):Observable<any>{
    const formData=new FormData();
    formData.append('fechaInicio',filtro.fecha_inicio)
    formData.append('fechafin',filtro.fecha_fin)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'ListarNotaVenta',formData,{headers})
  }
  TraerNotaVenta(token,id_nota_venta):Observable<any>{
    const formData=new FormData();
    formData.append('id_nota_venta',id_nota_venta)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'TraerNotaVenta',formData,{headers})
  }

  GraficaNotaVenta(token,filtro):Observable<any>{
    const formData=new FormData();
    formData.append('fechaInicio',filtro.fecha_inicio)
    formData.append('FechaFin',filtro.fecha_fin)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'GraficaFechaNotaVenta',formData,{headers})
  }

  ReporteNotaVenta(token,filtro):Observable<any>{
    const formData=new FormData();
    formData.append('fechaInicio',filtro.fecha_inicio)
    formData.append('FechaFin',filtro.fecha_fin)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'ReporteFechaNotaVenta',formData,{headers})
  }
  ReportePDFNotaVenta(token,filtro):Observable<any>{
    const formData=new FormData();
    formData.append('fechaInicio',filtro.fecha_inicio)
    formData.append('FechaFin',filtro.fecha_fin)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(this.linkApi+'ReportePDFNotaVenta',formData,{headers})
  }
}
