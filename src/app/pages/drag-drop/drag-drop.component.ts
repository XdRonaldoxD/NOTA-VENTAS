import { Component, OnInit } from '@angular/core';
import { producto_interface } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { LoginService } from '../../services/login/login.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

declare var $;
@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent implements OnInit {
  listaProducto: any = [];
  token: any;
  identity: any;
  constructor(
    private _ProductoServicio: ProductoService,
    private _loginServicio: LoginService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();
    this.DatosProducto();
  }

  DatosProducto() {
    // this._ProductoServicio
    //   .TraerProductoDrop(this.token)
    //   .subscribe((respuesta) => {
    //     console.log(respuesta);

    //     this.listaProducto = respuesta;
    //   });
  }
  drop(event: CdkDragDrop<any>) {
    // let anterior = event.previousIndex;
    // let actual = event.currentIndex;
    // moveItemInArray(this.listaProducto, anterior, actual);
    // console.log(event.container.data);
    // this._ProductoServicio.CargarProductoDrop(this.token,event.container.data).subscribe(res=>{
    //   console.log(res);
    // });
  }

}
