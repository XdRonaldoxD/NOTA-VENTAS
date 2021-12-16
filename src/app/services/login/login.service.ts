import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  linkApi = 'http://apiventa.pe/api/';
  token:any;
  UserIdentificado:any;
  constructor(
    private httpcliente: HttpClient,
  ) { }

  getIdentity(){
    let identity=JSON.parse(localStorage.getItem('UserIdentificado'));
    if (identity && identity!='undefined') {
      this.UserIdentificado=identity;
    }else{
      this.UserIdentificado=null;
    }
    return this.UserIdentificado;
  }
  getToken(){
    let token=localStorage.getItem('token');
    if (token && token!='undefined') {
      this.token=token;
    }else{
      this.token=null;
    }
    return this.token;
  }

  login(user,getToken=null):Observable<any>{
    if (getToken !=null) {
        user.getToken='true'
    }
   let json=JSON.stringify(user);
   let params=json;
   let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

   return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Usuario&action=login",params,{headers:headers})
 }

 RegistrarUsuario(user,getToken=null):Observable<any>{
  if (getToken !=null) {
      user.getToken='true'
  }
 let json=JSON.stringify(user);
 let params=json;
 let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
 return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Usuario&action=RegistrarUsuario",params,{headers:headers})
}

 cerrarSession(id_user):Observable<any>{
  let json=JSON.stringify(id_user);
  let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

  return this.httpcliente.post("http://localhost/MVC_APIVENTA/?controller=Usuario&action=EliminarSesion",json,{headers:headers})
}

}
