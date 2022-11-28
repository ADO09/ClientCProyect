import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { RegistroClientService } from '@data/services/api/user/registro-client.service';
import { UsersService } from '@data/services/api/user/users.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';

@Component({
  selector: 'app-registro-fisio',
  templateUrl: './registro-fisio.component.html',
  styleUrls: ['./registro-fisio.component.css'],
})
export class RegistroFisioComponent implements OnInit {
  regClient = INTERNAL_ROUTES.MODULO_REGCLIENT;
  public formRegistroFisio!: FormGroup;
  public formData: any = new FormData();
  prevsImg: any = './../../../assets/imagenes/RegistroFisio.png';

  public filesF: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private regClientService: RegistroClientService,
    private router: Router
  ) {
    this.formRegistroFisio = fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido1: ['', Validators.compose([Validators.required])],
      apellido2: ['', Validators.compose([Validators.required])],
      edad: ['', Validators.compose([Validators.required, Validators.min(12)])],
      direccion: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([Validators.required,Validators.maxLength(12)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      RFC: ['', Validators.compose([Validators.required,Validators.maxLength(15)])],
      telefono_casa: ['', Validators.compose([Validators.maxLength(12)])],
      cedula: [null, Validators.compose([Validators.required])],
      titulo: [null, Validators.compose([Validators.required])],
      certificados: [null, Validators.compose([Validators.required])],
      especialidades: [null, Validators.compose([Validators.required])],
      anos_exp: ['', Validators.compose([])],
      evidencia: [null, Validators.compose([])],
      disponibilidad: ['', Validators.compose([Validators.required])],
      fotografia: [null, Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required])],
      usuario: ['', Validators.compose([Validators.required])],
      contrasena: ['', Validators.compose([Validators.required])],
      TipoUsuario: ['fisioterapeuta', Validators.compose([])],
    });
  }

  get fm() {
    return this.formRegistroFisio.controls;
  }

  ngOnInit(): void {}

  imgFile(event: any): any {
    const ImagenFileArchivo: File = event.target.files[0];
    for (let index = 0; index < event.target.files.length; index++) {
      this.filesF.push(event.target.files[index]);
      this.formData.delete('fotografia');
     
      this.formData.append('fotografia', event.target.files[index]);
    }

    if (ImagenFileArchivo) {
      this.blobFile(ImagenFileArchivo).then((file: any) => {
        this.prevsImg = file.base;
      });
    }
  }

  tituloFile(event: any): any {
    for (let index = 0; index < event.target.files.length; index++) {
      const tituloFileArchivo: File = event.target.files[index];

     
      this.formData.delete('titulo');
    
      this.filesF.push(event.target.files[index]);
      this.formData.append('titulo', event.target.files[index]);
    }
  }

  especialidadesFile(event: any): any {
    for (let index = 0; index < event.target.files.length; index++) {
      const especialidadesFileArchivo: File = event.target.files[index];

   
      this.formData.delete('especialidades');
    
      this.filesF.push(event.target.files[index]);
      this.formData.append('especialidades', event.target.files[index]);
      
    }
  }

  certificadosFile(event: any): any {
    const certificadosFileArchivo: File = event.target.files[0];



   
    this.formData.delete('certificados');
   
    if (certificadosFileArchivo) {
      this.formData.append('certificados', event.target.files[0]);
    }
  }

  evidenciaFile(event: any): any {
    const evidenciaFileArchivo: File = event.target.files[0];

   
    this.formData.delete('evidencia');
  

    if (evidenciaFileArchivo) {
      this.formData.append('evidencia', event.target.files[0]);
    }
  }

  cedulaFile(event: any): any {
    const cedulaFileArchivo: File = event.target.files[0];


  
    this.formData.delete('cedula');
    if (cedulaFileArchivo) {
      this.formRegistroFisio.value.cedula = cedulaFileArchivo;
      this.formData.append('cedula', event.target.files[0]);
    }
  }

  subRegFisio(): void {
    console.log(this.formRegistroFisio.value);

    this.formData.append('nombre', this.formRegistroFisio.value.nombre);
    this.formData.append('apellido1', this.formRegistroFisio.value.apellido1);
    this.formData.append('apellido2', this.formRegistroFisio.value.apellido2);
    this.formData.append('telefono', this.formRegistroFisio.value.telefono);
    this.formData.append('correo', this.formRegistroFisio.value.email);
    this.formData.append('usuario', this.formRegistroFisio.value.usuario);
    this.formData.append('contrasena', this.formRegistroFisio.value.contrasena);
    this.formData.append(
      'TipoUsuario',
      this.formRegistroFisio.value.TipoUsuario
    );

    //archivos
    console.log(this.formData.get('cedula'));
    console.log(this.formData.get('titulo'));
    console.log(this.formData.get('fotografia'));
    console.log(this.formData.get('certificados'));
    console.log(this.formData.get('evidencia'));
    console.log(this.formData.get('especialidades'));

    this.formData.append(
      'disponibilidad',
      this.formRegistroFisio.value.disponibilidad
    );
    this.formData.append('anos_exp', this.formRegistroFisio.value.anos_exp);
    this.formData.append(
      'telefono_casa',
      this.formRegistroFisio.value.telefono_casa
    );
    this.formData.append('precio', this.formRegistroFisio.value.precio);
    this.formData.append('puntuacion', 0);
    this.formData.append('RFC', this.formRegistroFisio.value.RFC);
    this.formData.append('direccion', this.formRegistroFisio.value.direccion);
    this.formData.append('edad', this.formRegistroFisio.value.edad);
    this.formData.append('TemaPagina', 'blue-dark');

    this.regClientService.RegFisio(this.formData).subscribe((r) => {
      if (r.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este usuario y/o RFC ya esta en uso para cuenta de Fisioterapeuta!',
        });

        // this.formData.delete('fotografia');
        // this.formData.delete('titulo');
        // this.formData.delete('especialidades');
        // this.formData.delete('certificados');
        // this.formData.delete('evidencia');
        // this.formData.delete('cedula');
        this.formData.delete('nombre');
        this.formData.delete('apellido1');
        this.formData.delete('apellido2');
        this.formData.delete('telefono');
        this.formData.delete('correo');
        this.formData.delete('usuario');
        this.formData.delete('contrasena');
        this.formData.delete('TipoUsuario');
        this.formData.delete('disponibilidad');
        this.formData.delete('anos_exp');
        this.formData.delete('telefono_casa');
        this.formData.delete('precio');
        this.formData.delete('puntuacion');
        this.formData.delete('RFC');
        this.formData.delete('direccion');
        this.formData.delete('edad');
        this.formData.delete('TemaPagina');
      }
      console.log(r);
      if (!r.error) {
        Swal.fire({
          icon: 'success',
          title: 'Fisioterapeuta registrado',
          showConfirmButton: false,
          timer: 900,
        });
        this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
      }
    });
  }

  blobFile = async ($event: any) =>
    new Promise((resolve) => {
      try {
        const unsafeImg = URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          return resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          return resolve({
            blob: $event,
            image,
            base: null,
          });
        };
        return null;
      } catch (e) {
        return null;
      }
    });
}
