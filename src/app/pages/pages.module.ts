import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { PagesComponent } from './pages.component';
import { MarcaComponent } from './marca/marca.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { TipoInventarioComponent } from './tipo-inventario/tipo-inventario.component';
import { ProductosComponent } from './productos/productos.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';
import { NotaVentaDetalleComponent } from './nota-venta-detalle/nota-venta-detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from './pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { AperturaCajaComponent } from './apertura-caja/apertura-caja.component';
import { CajaComponent } from './caja/caja.component';
import { InventarioProductoComponent } from './inventario-producto/inventario-producto.component';
import { MigrarproductoComponent } from './migrarproducto/migrarproducto.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PaginacionMaterialComponent } from './paginacion-material/paginacion-material.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DataTablesModule } from 'angular-datatables';

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    PagesComponent,
    MarcaComponent,
    ProveedorComponent,
    TipoInventarioComponent,
    ProductosComponent,
    ReporteGraficoComponent,
    NotaVentaComponent,
    NotaVentaDetalleComponent,
    PresentacionComponent,
    ReporteVentaComponent,
    AperturaCajaComponent,
    CajaComponent,
    InventarioProductoComponent,
    MigrarproductoComponent,
    DragDropComponent,
    PaginacionMaterialComponent,

  ],
  imports: [
    CKEditorModule,
    PipeModule,
    PAGES_ROUTES,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    TooltipModule ,
    NgbModule,
    ChartsModule,
    DragDropModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    DataTablesModule,
    NgSelectModule

  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class PagesModule { }
