export interface producto_interface{
    id_producto?:number,
    id_tipo_producto?:any,
    id_tipo_concentracion?:any,
    id_tipo_inventario?:any,
    id_unidad?:any,
    id_marca?:string,
    id_proveedor?:string,
    codigo_producto?:string,
    glosa_producto?:string,
    detalle_producto?:string,
    multidosis_producto?:string,
    dosis_producto?:string,
    concentracion_producto?:string,
    cantidad_producto?:string,
    stock_producto?:string,
    preciocosto_producto?:any,
    precioventa_producto?:string,
    
    // fechacreacion_producto?:string,
    // saldocantidad_producto?:string,
    contenidomultidosis_producto?:string,
    vigente_producto?:string,

}

export interface producto_interface_edit{
    id_producto_edit?:number,
    id_tipo_producto?:any,
    id_tipo_concentracion?:any,
    id_tipo_inventario?:any,
    id_unidad?:any,
    id_marca?:string,
    id_proveedor?:string,
    codigo_producto?:string,
    glosa_producto?:string,
    detalle_producto?:string,
    multidosis_producto?:string,
    dosis_producto?:string,
    concentracion_producto?:string,
    cantidad_producto?:string,
    stock_producto?:string,
    preciocosto_producto?:any,
    precioventa_producto?:string,
    // fechacreacion_producto?:string,
    // saldocantidad_producto?:string,
    contenidomultidosis_producto?:string,
    vigente_producto?:string,

}


export interface producto_historial_interface{
    id_producto_historial?:number,
    id_usuario?:any,
    tipo_movimiento?:any,
    id_producto?:any,
    movimiento_historial?:any,
    stock_final_producto?:any,
    preciocosto_producto?:any,
    comentario_producto_historial?:any,

}

export interface producto_filtro{
    codigo_filtro?:any,
    nombre_produc_filtro?:any,
    producto_inventario_filtro?:any,
    producto_tipo_filtro?:any,
}