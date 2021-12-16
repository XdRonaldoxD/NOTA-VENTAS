import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  identity?:any;

  constructor(
    private _loginServicio:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.identity= this._loginServicio.getIdentity();

  }

  togglebtn(){
    if($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    // setTimeout(function(){ 
    //   mA.redraw();
    //   mL.redraw();
    // }, 300);
    return false;
  }

  CerrarSesion(){
    this._loginServicio.cerrarSession(this.identity.sub).subscribe(respuesta=>{
        if (respuesta="Sesion destruida con exito") {
          localStorage.removeItem("UserIdentificado");
          localStorage.removeItem("token");
          this.router.navigate(["/loginMedico"]);
        }
    })
  
  }

}
