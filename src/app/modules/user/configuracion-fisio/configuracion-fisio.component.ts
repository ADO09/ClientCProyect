import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiResponse, ListFisioCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';
import Swal from 'sweetalert2';
import { enviroment as ENV } from './../../../../environments/enviroments.dev';

@Component({
  selector: 'app-configuracion-fisio',
  templateUrl: './configuracion-fisio.component.html',
  styleUrls: ['./configuracion-fisio.component.css']
})
export class ConfiguracionFisioComponent implements OnInit {

  public dataFisio!: ListFisioCard;
  public id!: any;
  public formData = new FormData();
  public urlimg:any;
  public resPuptdFisio!:ApiResponse;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private authService: ApiService,
    private router:Router
  ) {

    this.id = +this.route.snapshot.params['id_fisio'];

    this.formModificarUsuario = fb.group({

      nombre_: ['', Validators.compose([
        Validators.required
      ])],
      apellido1_: ['', Validators.compose([
        Validators.required
      ])],
      apellido2_: ['', Validators.compose([
        Validators.required
      ])],
      edad_: ['', Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      direccion_: ['', Validators.compose([
        Validators.required
      ])],
      telefono_: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      correo_: ['', Validators.compose([
        Validators.required
      ])],
      RFC_: ['', Validators.compose([
        Validators.required
      ])],
      telefono_casa_: ['', Validators.compose([
        Validators.required
      ])],
      cedula_: ['', Validators.compose([
        Validators.required
      ])],
      titulo_: ['', Validators.compose([
        Validators.required
      ])],
      certificados_: ['', Validators.compose([
        Validators.required
      ])],
      especialidades_: ['', Validators.compose([
        Validators.required
      ])],
      anos_exp_: ['', Validators.compose([
        Validators.required
      ])],
      evidencia_: ['', Validators.compose([
        Validators.required
      ])],
      disponibilidad_: ['', Validators.compose([
        Validators.required
      ])],
      precio_: ['', Validators.compose([
        Validators.required
      ])],
      usuario_: ['', Validators.compose([
        Validators.required
      ])],
      contrasena_: ['', Validators.compose([
        Validators.required
      ])],

      foto_: ['', Validators.compose([
        Validators.required
      ])],

    })
  }

  public formModificarUsuario!: FormGroup;
  ngOnInit(): void {

    this.userService.getoneUsersF(this.id).subscribe((r) => {

      this.dataFisio = r.data;
      // this.formModificarUsuario.value.nombre_ = this.dataFisio.nombre;
      this.urlimg =ENV.urlAPI + '/' + this.dataFisio.fotografia ;
      this.formModificarUsuario.controls['nombre_'].setValue(this.dataFisio.nombre);
      this.formModificarUsuario.controls['apellido1_'].setValue(this.dataFisio.apellido1);
      this.formModificarUsuario.controls['apellido2_'].setValue(this.dataFisio.apellido2);
      this.formModificarUsuario.controls['edad_'].setValue(this.dataFisio.edad);
      this.formModificarUsuario.controls['direccion_'].setValue(this.dataFisio.direccion);
      this.formModificarUsuario.controls['telefono_'].setValue(this.dataFisio.telefono);
      this.formModificarUsuario.controls['correo_'].setValue(this.dataFisio.correo);
      this.formModificarUsuario.controls['RFC_'].setValue(this.dataFisio.RFC);
      this.formModificarUsuario.controls['telefono_casa_'].setValue(this.dataFisio.telefono_casa);
      this.formModificarUsuario.controls['anos_exp_'].setValue(this.dataFisio.anos_exp);
      this.formModificarUsuario.controls['disponibilidad_'].setValue(this.dataFisio.disponibilidad);
      this.formModificarUsuario.controls['precio_'].setValue(this.dataFisio.precio);
      this.formModificarUsuario.controls['usuario_'].setValue(this.dataFisio.usuario);
      this.formModificarUsuario.controls['contrasena_'].setValue(this.dataFisio.contrasena);

     // console.log(r)
    })
  }

  subRegClient(): void {
    
    this.formData.append('nombre',this.formModificarUsuario.value.nombre_);
    this.formData.append('apellido1',this.formModificarUsuario.value.apellido1_);
    this.formData.append('apellido2',this.formModificarUsuario.value.apellido2_);
    this.formData.append('edad',this.formModificarUsuario.value.edad_);
    this.formData.append('direccion',this.formModificarUsuario.value.direccion_);
    this.formData.append('telefono',this.formModificarUsuario.value.telefono_);
    this.formData.append('correo',this.formModificarUsuario.value.correo_);
    this.formData.append('RFC',this.formModificarUsuario.value.RFC_);
    this.formData.append('telefono_casa',this.formModificarUsuario.value.telefono_casa_);
    this.formData.append('anos_exp',this.formModificarUsuario.value.anos_exp_);
    this.formData.append('precio',this.formModificarUsuario.value.precio_);
    this.formData.append('usuario',this.formModificarUsuario.value.usuario_);
    this.formData.append('contrasena',this.formModificarUsuario.value.contrasena_);
   // console.log(this.formData.get('nombre'));

    Swal.fire({
      title: 'QUIERES GUARDAR LOS CAMBIOS?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        

       
        
        
        this.userService.updateFisio(this.formData,this.id).subscribe( r =>{
          //console.log(r.error);
          if (!r.error) {
            Swal.fire('Saved!', '', 'success')
            this.resPuptdFisio = r.data;
            console.log(this.resPuptdFisio);
            this.authService.setUserToLocalStorage(this.resPuptdFisio);
              setTimeout(() => this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PERFILFISIOS + this.authService.getUser.id_fisio), 1500);
          }else{
            Swal.fire(r.msg+'!', '', 'error')
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
        })


      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
 
    
  }
 
  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlimg = event.target.result;
      }
      this.formData.delete('fotografia');
     
      this.formData.append('fotografia',e.target.files[0]);
    }
  }

  onselectFileC(e: any) {
    if (e.target.files) {

    
      this.formData.delete('cedula');
      this.formData.append('cedula',e.target.files[0]);
    }
  }

  onselectFileT(e: any) {
    if (e.target.files) {
      
      this.formData.delete('titulo');
     
      this.formData.append('titulo',e.target.files[0]);
    }
  }

  onselectFileCER(e: any) {
    if (e.target.files) {
      
      this.formData.delete('certificados');
   
      this.formData.append('certificados',e.target.files[0]);
    }
  }

  onselectFileESP(e: any) {
    if (e.target.files) {

      this.formData.delete('especialidades');

      this.formData.append('especialidades',e.target.files[0]);
    }
  }
  onselectFileEVD(e: any) {
    if (e.target.files) {
  
      this.formData.delete('evidencia');

      this.formData.append('evidencia',e.target.files[0]);
    }
  }




}
