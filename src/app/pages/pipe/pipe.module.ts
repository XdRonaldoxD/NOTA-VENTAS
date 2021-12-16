import { NgModule } from '@angular/core';
import { MarcaPipe } from './marca.pipe';
import { InventarioPipe } from './inventario.pipe';
import { ProveedorPipe } from './proveedor.pipe';
import { ProductoPipe } from './producto.pipe';
import { NotaventaPipe } from './notaventa.pipe';
import { NotaventadetallePipe } from './notaventadetalle.pipe';
import { HistorialproductoPipe } from './historialproducto.pipe';
import { PresentacionPipe } from './presentacion.pipe';
import { CajaPipe } from './caja.pipe';
import { AperturacajaPipe } from './aperturacaja.pipe';
import { InventarioproductoPipe } from './inventarioproducto.pipe';
import { PaginatePipe } from './paginate.pipe';
import { PaginatematerialPipe } from './paginatematerial.pipe';

@NgModule({
  declarations: [
    MarcaPipe,
    InventarioPipe,
    ProveedorPipe,
    ProductoPipe,
    NotaventaPipe,
    NotaventadetallePipe,
    HistorialproductoPipe,
    PresentacionPipe,
    CajaPipe,
    AperturacajaPipe,
    InventarioproductoPipe,
    PaginatePipe,
    PaginatematerialPipe,
  ],
  imports: [],
  exports: [
    MarcaPipe,
    InventarioPipe,
    ProveedorPipe,
    ProductoPipe,
    NotaventaPipe,
    NotaventadetallePipe,
    HistorialproductoPipe,
    PresentacionPipe,
    CajaPipe,
    AperturacajaPipe,
    InventarioproductoPipe,
    PaginatePipe,
    PaginatematerialPipe
  ],
})
export class PipeModule {}
