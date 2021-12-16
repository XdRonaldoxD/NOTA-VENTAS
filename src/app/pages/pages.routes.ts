import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { BodyComponent } from './body/body.component';
import { MarcaComponent } from './marca/marca.component';
import { ProductosComponent } from './productos/productos.component';
import { TipoInventarioComponent } from './tipo-inventario/tipo-inventario.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { NotaVentaComponent } from './nota-venta/nota-venta.component';
import { NotaVentaDetalleComponent } from './nota-venta-detalle/nota-venta-detalle.component';
import { AuthGuard } from '../guards/auth.guard';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { CajaComponent } from './caja/caja.component';
import { AperturaCajaComponent } from './apertura-caja/apertura-caja.component';
import { InventarioProductoComponent } from './inventario-producto/inventario-producto.component';
import { MigrarproductoComponent } from './migrarproducto/migrarproducto.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { PaginacionMaterialComponent } from './paginacion-material/paginacion-material.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'inicio', component: BodyComponent ,canActivate:[AuthGuard] },
          { path: 'Marca', component: MarcaComponent,canActivate:[AuthGuard] },
          { path: 'Producto', component: ProductosComponent,canActivate:[AuthGuard] },
          { path: 'Tipo_Inventario', component: TipoInventarioComponent,canActivate:[AuthGuard] },
          { path: 'Proveedor', component: ProveedorComponent ,canActivate:[AuthGuard]},
          { path: 'Reporte_Grafico', component: ReporteGraficoComponent ,canActivate:[AuthGuard]},
          { path: 'Nota_Venta', component: NotaVentaComponent,canActivate:[AuthGuard] },
          { path: 'Nota_Venta_Detalle', component: NotaVentaDetalleComponent,canActivate:[AuthGuard] },
          { path: 'Presentacion', component: PresentacionComponent,canActivate:[AuthGuard] },
          { path: 'ReporteVenta', component: ReporteVentaComponent,canActivate:[AuthGuard] },
          { path: 'Caja', component: CajaComponent,canActivate:[AuthGuard] },
          { path: 'MigrarProducto', component: MigrarproductoComponent,canActivate:[AuthGuard] },
          { path: 'Inventario_Producto', component: InventarioProductoComponent,canActivate:[AuthGuard] },
          { path: 'AperturaCaja/:id_caja', component: AperturaCajaComponent,canActivate:[AuthGuard] },
          { path: 'Drag_Drop', component: DragDropComponent,canActivate:[AuthGuard] },
          { path: 'PaginacionMateria', component: PaginacionMaterialComponent,canActivate:[AuthGuard] },
          { path: '', redirectTo: '/loginMedico', pathMatch: 'full' },
          
        ],
      },
  // { path: "**", component: BodyComponent },
];

export const PAGES_ROUTES=RouterModule.forChild(pagesRoutes)
