export interface caja_interface{
    id_caja?:any,
    id_usuario?:any,
    glosa_caja?:any,
    numero_caja?:any,
    folio_caja?:any,
    fechacreacion_caja?:any,
    fechacierre_caja?:any,
    estado_caja?:any,
    
}

export interface apertura_caja_interface{
    id_apertura_caja?:any,
    id_caja?:any,
    id_usuario?:any,
    apertura_caja_fechainicio?:any,
    apertura_caja_fechafin?:any,
    apertura_caja_monto_inicial?:any,
    apertura_caja_monto_final?:any,
    apertura_caja_total_ventas?:any,
    apertura_caja_cantidad_ventas?:any,
    apertura_caja_estado?:any,
    apertura_caja_descuento_ventas?:any
    
}