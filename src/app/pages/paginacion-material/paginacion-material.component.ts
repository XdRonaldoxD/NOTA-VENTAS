import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto/producto.service';
import { LoginService } from '../../services/login/login.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginacion-material',
  templateUrl: './paginacion-material.component.html',
  styleUrls: ['./paginacion-material.component.css'],
})
export class PaginacionMaterialComponent implements OnInit {
  listaProducto: any = [];
  token: any;

  identity: any;
  pageSize: number = 3;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20, 50];
  constructor(
    private _ProductoServicio: ProductoService,
    private _loginServicio: LoginService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
    this.identity = this._loginServicio.getIdentity();
    this.DatosProducto();
  }

  pageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  DatosProducto() {
    // this._ProductoServicio
    //   .TraerProductoDrop(this.token)
    //   .subscribe((respuesta) => {
    //     console.log(respuesta);

    //     this.listaProducto = respuesta;
    //   });
  }
}
