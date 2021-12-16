import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerMarcas(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get("http://localhost/MVC_APIVENTA/?controller=Marca&action=ListarMarca", { headers: headers })
  }
  TraerMarcasDesactivados(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get(this.linkApi + 'ListarMarcaDesactivados', { headers: headers })
  }

  TraerMarcaSeleccionado(token, id): Observable<any> {
    let datos = {
      id_marca: id
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Marca&action=TraerMarca", datos, { headers })
  }
  GuardarMarca(token, datos): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Marca&action=GuardarMarca", datos, { headers })
  }
  DesactivarMarca(token, id_marca): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Marca&action=DesactivarMarca", id_marca, { headers })
  }
  ActivarMarca(token, id_marca): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Marca&action=ActivarMarca", id_marca, { headers })
  }
}
