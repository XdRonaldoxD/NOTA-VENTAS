import { Component, OnInit } from '@angular/core';
import { login } from '../interfaces/login';
import Swal from "sweetalert2";
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  identity:any;
  token:any;
  validar:boolean=false;
  constructor(
    private _loginServicio:LoginService,
    private router:Router
  ) { }
  login:login={};
  ngOnInit(): void {
  }

  Ingresar(datos){
    if (datos.valid) {
      $(".btn_ingresar").attr("disabled",true);
      this._loginServicio.login(this.login).subscribe(response=>{
        if (response.status != 'error' ) {
          this.token=response;
          //objeto usuario Identificado
          this._loginServicio.login(this.login,true).subscribe(
            response => {
              this.identity=response;
              // DATOS USUARIO IDENTIFICADO
              localStorage.setItem('token',this.token);
              localStorage.setItem('UserIdentificado',JSON.stringify(this.identity))
              this.router.navigate(['/inicio']);
              Swal.fire({
                toast:true,
                position: 'top',
                icon: 'success',
                title: 'Usuario Correcto',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000
              })
            },
            error =>{
              console.log(<any>error);
            }
          );
        }else{
          if (!isNaN(response.id_usuario)) {
            this.login.id_usuario=response.id_usuario;
            $('#exampleModalCenter').modal('show');
          }else{
            this.validar=true;
            Swal.fire({
              toast:true,
              position: 'top',
              icon: 'error',
              title: 'Usuario Incorrecto',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000
            })
          } 
  
        }
        $(".btn_ingresar").attr("disabled",false);
      })
      this.validar=false;
    
    }else{
      this.validar=true;
      Swal.fire({
        toast:true,
        position: 'top',
        icon: 'error',
        title: 'Usuario Incorrecto',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
      })
    }


  }

  CerrandoSession(){
    // console.log(this.user.id);
    this._loginServicio.cerrarSession(this.login.id_usuario)
    .subscribe(respo=>{
      // console.log(respo);
      $('#exampleModalCenter').modal('hide');
    })
  }

}
