import { Component, OnInit } from '@angular/core';
import { register_interface } from '../interfaces/register';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validar:boolean=false;
  register:register_interface={};
  constructor(
    private _registarUser: LoginService
  ) { }

  ngOnInit(): void {
  }

  registarUsuario(Datos){
    if (Datos.valid) {
      if (this.register.password_usuario!=this.register.password_repetido) {
        this.validar=true;
        Swal.fire({
          toast:true,
          position: 'top',
          icon: 'error',
          title: `La contraseña no concide`,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000
        })
      }else{
        this._registarUser.RegistrarUsuario(this.register).subscribe(respuesta=>{
          if(respuesta.code=200){
            Swal.fire({
              toast:true,
              position: 'top',
              icon: 'success',
              title: `Se registro correctamente el usuario`,
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000
            })
            Datos.reset();
          }
        });
        this.validar=false;
      }
  
    }else{
      this.validar=true;
      Swal.fire({
        toast:true,
        position: 'top',
        icon: 'error',
        title: `Debe llenar los campos Correctamente`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
      })
    }
  }

}
