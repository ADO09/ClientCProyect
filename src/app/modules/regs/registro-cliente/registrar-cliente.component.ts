import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiResponse } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { RegistroClientService } from '@data/services/api/user/registro-client.service';
import { window } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {
  regFisio = INTERNAL_ROUTES.MODULO_REGFISIO;
  public prevsImg :any = 'https://cdn-icons-png.flaticon.com/512/16/16410.png';
  public formRegistroCliente!: FormGroup;
  public formData = new FormData();
  public fileName = '';

  constructor(private fb: FormBuilder,
    private regClienteService: RegistroClientService,
    private apiService: ApiService,
    private sanitizer:DomSanitizer,
    private router:Router
  ) {
    this.formRegistroCliente = fb.group({
      nombre: ['', Validators.compose([
        Validators.required
      ])],
      apellido1: ['', Validators.compose([
        Validators.required,
        Validators.max(6)
      ])],
      apellido2: ['', Validators.compose([
        Validators.required
      ])],
      edad: ['', Validators.compose([
        Validators.required,
        Validators.min(13),
      ])],
      telefono: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9 ]{12}"),
        Validators.maxLength(12)
      ])],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      curp: ['', Validators.compose([
        Validators.required,
        Validators.minLength(18),
        Validators.maxLength(18)
      ])],
      usuario: ['', Validators.compose([
        Validators.required
      ])],
      contrasena: ['', Validators.compose([
        Validators.required
      ])],
      fotografia: [null, Validators.compose([
        Validators.required
      ])],
      TipoUsuario: ['cliente', Validators.compose([
       
      ])],
      favoritos: ['', Validators.compose([
      
      ])],

    })


    console.log(this.fm['telefono'].errors);
    
  }


  imagenFile(event: any): any {
    const ImagenFileArchivo: File = event.target.files[0];

    if (ImagenFileArchivo) {
      this.formData.delete('fotografia');
       this.formRegistroCliente.value.fotografia = ImagenFileArchivo
       this.formData.append('fotografia', ImagenFileArchivo);
      this.blobFile(ImagenFileArchivo).then((file:any) =>{
        this.prevsImg = file.base;
        console.log(this.prevsImg);
       // this.formRegistroCliente.value.fotografia = this.prevsImg;
        console.log(this.formRegistroCliente.value.fotografia);
       
      })
    }
    //
    //console.log(this.formRegistroCliente.value.fotografia);
  }
  ngOnInit(): void {
  }

  get fm(){
    return this.formRegistroCliente.controls;
  }

  subRegClient(): void {
    console.log(this.formRegistroCliente.value);
    console.log(this.formRegistroCliente.value);
    
   
    this.formData.append('nombre', this.formRegistroCliente.value.nombre);
    this.formData.append('apellido1', this.formRegistroCliente.value.apellido1);
    this.formData.append('edad', this.formRegistroCliente.value.edad);
    this.formData.append('apellido2', this.formRegistroCliente.value.apellido2);
    this.formData.append('telefono', this.formRegistroCliente.value.telefono);
    this.formData.append('correo', this.formRegistroCliente.value.correo);
    this.formData.append('curp', this.formRegistroCliente.value.curp);
    this.formData.append('usuario', this.formRegistroCliente.value.usuario);
    this.formData.append('contrasena', this.formRegistroCliente.value.contrasena);
    this.formData.append('TipoUsuario', this.formRegistroCliente.value.TipoUsuario);
    this.formData.append('TemaPagina', 'blue-dark');
    this.formData.append('favoritos', this.formRegistroCliente.value.favoritos);


    this.regClienteService.RegClient(this.formData).subscribe(r => {

    console.log(r);
      if (!r.error) {

        Swal.fire({
          icon: 'success',
          title: 'Cliente registrado',
          showConfirmButton: false,
          timer: 1200
        })


         setTimeout( ()=> this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PAGPRINCP),900);
    //     const regCliente: ApiResponse = {

    //       id: 1,
    //       usuario: this.formRegistroCliente.value.usuario,
    //       contraseña: this.formRegistroCliente.value.contraseña,
    //       tipoUsuario: this.formRegistroCliente.value.tipoUsuario,
    //       correo: this.formRegistroCliente.value.correo,
    //       nombre: this.formRegistroCliente.value.nombre,
    //       fotografia: this.formRegistroCliente.value.fotografia
    //     }
    //     console.log(regCliente);
    //     console.log("aosihdoadij");
        
    //     this.apiService.setUserToLocalStorage(regCliente);
    //     this.apiService.currentUser.next(regCliente);
      }
      else{
      console.log(r.msg);

      Swal.fire({
        icon: 'error',
        title:   ' El curp o el usuario ya estan ligados a una cuenta!',
        showConfirmButton: false,
        timer: 1000
      })


      this.formData.delete('nombre');
      this.formData.delete('apellido1');
      this.formData.delete('apellido2');
      this.formData.delete('telefono');
      this.formData.delete('edad');
      this.formData.delete('correo');
      this.formData.delete('curp');
      this.formData.delete('usuario');
      this.formData.delete('contrasena');
      this.formData.delete('TipoUsuario');
      this.formData.delete('TemaPagina');
      this.formData.delete('favoritos');

      
      }
    })



  }




  blobFile = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
      return  resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
     return   resolve({
          blob: $event,
          image,
          base: null
        });
      };
      return null;
    } catch (e) {
      return null;
    }
  });
}
