import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiResponse, cliTPinterface } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';
import Swal from 'sweetalert2';
import { enviroment as ENV } from './../../../../environments/enviroments.dev';

@Component({
  selector: 'app-configuracion-paciente',
  templateUrl: './configuracion-paciente.component.html',
  styleUrls: ['./configuracion-paciente.component.css']
})
export class ConfiguracionPacienteComponent implements OnInit {
  public urlimg!:any;
  public dataConfClient!:cliTPinterface;
  public id!:any;
  public formModificarUsuario!:FormGroup;
  public resPuptdClient!:ApiResponse;
  public formData = new FormData()
  public profileC = INTERNAL_ROUTES.MODULO_PERFILCLIENTES + this.authService.getUser.id_cliente ;
  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private userService: UsersService,
    private authService: ApiService,
  ) { 

    this.id = +this.route.snapshot.params['id_cliente'];
  }

  ngOnInit(
    
  ): void {


    this.userService.getoneUsersC(this.id).subscribe((r) => {

      console.log(r);
      
      this.dataConfClient = r.data;

      this.urlimg = ENV.urlAPI + '/' + this.dataConfClient.fotografia;
      console.log(this.dataConfClient);
      this.formModificarUsuario.controls['nombre_'].setValue(this.dataConfClient.nombre);
      this.formModificarUsuario.controls['apellido1_'].setValue(this.dataConfClient.apellido1);
    this.formModificarUsuario.controls['apellido2_'].setValue(this.dataConfClient.apellido2);
    this.formModificarUsuario.controls['edad_'].setValue(this.dataConfClient.edad);
    this.formModificarUsuario.controls['telefono_'].setValue(this.dataConfClient.telefono);
    this.formModificarUsuario.controls['correo_'].setValue(this.dataConfClient.correo);
     this.formModificarUsuario.controls['usuario_'].setValue(this.dataConfClient.usuario);
     this.formModificarUsuario.controls['contrasena_'].setValue(this.dataConfClient.contrasena);
     this.formModificarUsuario.controls['curp_'].setValue(this.dataConfClient.curp);
      })


      

          
    this.formModificarUsuario = this.fb.group({

      nombre_:[,Validators.compose([
       Validators.required
      ])],
      apellido1_:['',Validators.compose([
        Validators.required
      ])],
      apellido2_:['',Validators.compose([
        Validators.required
      ])],
      edad_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      telefono_:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      correo_:['',Validators.compose([
        Validators.required
      ])],
      curp_:['',Validators.compose([
        Validators.required
      ])],
      usuario_:['',Validators.compose([
        Validators.required
      ])],
      contrasena_:['',Validators.compose([
        Validators.required
      ])],
      foto_:['',Validators.compose([
        Validators.required
      ])]

    })


  }


  imagenFile(event: any): any {
    const ImagenFileArchivo: File = event.target.files[0];

    if (ImagenFileArchivo) {
      this.formData.delete('fotografia');
     this.formModificarUsuario.value.foto_ = ImagenFileArchivo;
     this.formData.append('fotografia',ImagenFileArchivo);
    }

  }

  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.urlimg=event.target.result;
      }
    }
  }


  subRegClient(){
    console.log( this.formModificarUsuario.value);
    
    this.formData = new FormData()

    this.formData.append('nombre',this.formModificarUsuario.value.nombre_);
    this.formData.append('apellido1',this.formModificarUsuario.value.apellido1_);
    this.formData.append('apellido2',this.formModificarUsuario.value.apellido2_);
    this.formData.append('curp',this.formModificarUsuario.value.curp_);
    this.formData.append('telefono',this.formModificarUsuario.value.telefono_);
    this.formData.append('correo',this.formModificarUsuario.value.correo_);
    
    this.formData.append('edad',this.formModificarUsuario.value.edad_);
    this.formData.append('contrasena',this.formModificarUsuario.value.contrasena_);
    this.formData.append('usuario',this.formModificarUsuario.value.usuario_);

    Swal.fire({
      title: 'QUIERES GUARDAR LOS CAMBIOS?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.updateClient(this.formData,this.id).subscribe((r) => {
          
          if(!r.error){
            Swal.fire('Saved!', '', 'success')
            this.resPuptdClient = r.data;
            this.authService.setUserToLocalStorage(this.resPuptdClient);
            setTimeout(() => window.location.reload(), 1500);
          }else{
            Swal.fire(r.error+'!', '', 'error')
            this.formData.delete('nombre');
            this.formData.delete('apellido1');
            this.formData.delete('apellido2');
            this.formData.delete('telefono');
            this.formData.delete('correo');
            this.formData.delete('curp');
            this.formData.delete('usuario');
            this.formData.delete('contrasena');
            this.formData.delete('TipoUsuario');
            this.formData.delete('TemaPagina');
            this.formData.delete('favoritos');
          }
              })

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
 
  }
}
