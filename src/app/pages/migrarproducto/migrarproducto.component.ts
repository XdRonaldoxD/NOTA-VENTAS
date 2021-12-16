import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { MigracionexcelService } from '../../services/migracionexcel/migracionexcel.service';
import * as moment from 'moment'

declare var $: any;
@Component({
  selector: 'app-migrarproducto',
  templateUrl: './migrarproducto.component.html',
  styleUrls: ['./migrarproducto.component.css'],
})
export class MigrarproductoComponent implements OnInit {
  token: any;
  archivos: File = null;
  imgTemporal: string;
  validar: boolean = false;
  texto:string;
  constructor(
    private _loginServicio: LoginService,
    private _MigrarInformacion: MigracionexcelService
  ) {}

  ngOnInit(): void {
    this.token = this._loginServicio.getToken();
  }

  linkApi = 'http://apiventa.pe/api/';
  public ExportarProducto() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", this.token);
    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    Swal.fire({
      title: 'Productos',
      html: 'Exportando el excel ...',
      text: 'Exportando el excel ...',
      allowOutsideClick: false,
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        fetch("http://localhost/MVC_APIVENTA/?controller=Producto&action=ExportarDatos", requestOptions)
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        let fecha = moment().format('MM-DD-YYYY HH:mm:ss')
        a.download = `Inventario_Producto${fecha}.xlsx`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
        Swal.close();
      })
      .catch(error => console.log('error', error));
      

      },
    });
  }

  EnviarProducto(datos) {
    if (this.archivos !== null) {
      Swal.fire({
        title: 'Producto',
        html: 'Cargando el excel ...',
        text: 'Cargando el excel ...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
          this._MigrarInformacion
          .EnviarArchivoProducto(this.token, this.archivos)
          .subscribe((data) => {
            if (data.respuesta==="Error columna") {
              Swal.fire({
                toast: true,
                position: 'top',
                icon: 'error',
                title: `Error en la columna del Excel.`,
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
              });
              datos.reset();
              this.archivos = null;
              return false;
            }

            if (data.validandoExcel.length > 0) {
              let html = ``;
              data.validandoExcel.forEach((element, index) => {
                html += '<tr>';
                // html += `<td>${index+1}</td>`;
                html += `<td>${element.fila}</td>`;
                html += `<td>${element.columna}</td>`;
                html += `<td class="text-danger">${element.comentario}</td>`;
                html += '</tr>';
              });
              $('.ValidarExcel').html(html);
              $('.validarColumnas').removeClass('d-none');
              $('#modal_datos').modal('show');
              $('.texto_principal').html('Campos Vacios del Excel.');
              $('.error_producto').addClass('d-none');
            } else if (data.datosexistente.length > 0) {
              let html = ``;
              data.datosexistente.forEach((element, index) => {
                html += '<tr>';
                html += `<td>${element.fila}</td>`;
                let ColumnasDato = element.columna.split('~');
                ColumnasDato.forEach((element) => {
                  html += `<td>${element}</td>`;
                });
                html += '</tr>';
              });
              $('.producto_sin_registro').html(html);
              $('.validarColumnas').addClass('d-none');
              $('.existe_producto').removeClass('d-none');
  
              $('#modal_datos').modal('show');
              $('.texto_principal').html('Validando Excel.');
              $('.error_producto').addClass('d-none');
            } else {
            
                Swal.fire({
                  toast: true,
                  position: 'top',
                  icon: 'success',
                  title: `Excel Migrado Exitosamente.`,
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 3000,
                });
              
            }
            Swal.close();
            datos.reset();
            this.archivos = null;
          });
      
        },
      });

     
    } else {
      Swal.fire({
        toast: true,
        position: 'top',
        icon: 'error',
        title: `Seleccione el Archivo.`,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
    }
  }

  seleccioneExcel(imagen: File) {
    // if (imagen.type.indexOf("xlsx") < 0) {
    //   Swal.fire(
    //     "Sólo imágenes",
    //     "El Archivo seleccionado no es un excel.",
    //     "error"
    //   );
    //   this.archivos = null;
    //   return;
    // }

    this.archivos = imagen;
    let reader = new FileReader();
    let urlImagentemp = reader.readAsDataURL(imagen);
    reader.onloadend = () => (this.imgTemporal = reader.result as string);
  }
}
