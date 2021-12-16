import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  linkApi = 'http://localhost/MVC_APIVENTA/?';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  TraerPresenteacion(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get(`${this.linkApi}controller=Unidad&action=ListarPresentacion`, { headers: headers })
  }
  TraerPresenteacionDesactivados(token): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.httpcliente.get(`${this.linkApi}controller=Unidad&action=ListarPresentacionDesactivados`, { headers: headers })
  }

  TraerTipoConcentracion(token, id_unidad) {
    let datos = {
      id_unidad: id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=TraerTipoConcentracion`, datos, { headers })
  }
  TraeridConcentracion(token, id_tipo_concentracion) {
    let datos = {
      id_tipo_concentracion
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=TraeridConcentracion`, datos, { headers })
  }

  EliminaridConcentracion(token, id_tipo_concentracion) {
    let datos = {
      id_tipo_concentracion
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=EliminaridConcentracion`, datos, { headers })
  }
  GuardarTipoConcentracion(token, tipo_concentracion) {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=Guardar_Editar_Concentracion`, tipo_concentracion, { headers })
  }

  TraerUnidadSeleccionado(token, id_unidad): Observable<any> {
    let datos = {
      id_unidad: id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=TraerUnidad`, datos, { headers })
  }
  GuardarUnidad(token, datos): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=GuardarUnidadEdit`, datos, { headers })
  }
  DesactivarPresentacion(token, id_unidad): Observable<any> {
    let datos = {
      id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=DesactivarPresentacion`, datos, { headers })
  }
  ActivarPresentacion(token, id_unidad): Observable<any> {
    let datos = {
      id_unidad
    }
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post(`${this.linkApi}controller=Unidad&action=ActivarPresentacion`, datos, { headers })
  }
}
