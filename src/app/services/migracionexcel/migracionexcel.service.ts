import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MigracionexcelService {
  linkApi = 'http://apiventa.pe/api/';
  constructor(
    private httpcliente: HttpClient,
  ) { }

  EnviarArchivoProducto(token,file):Observable<any>{
    const formData=new FormData();
    formData.append('archivo',file)
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Producto&action=EnviarArchivoProducto",formData,{headers})
  }
}
