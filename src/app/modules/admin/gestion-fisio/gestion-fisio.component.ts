import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse, ListFisioCard } from '@data/interfaces';
import { MailerService } from '@data/services/api/mails/mailer.service';
import { UsersService } from '@data/services/api/user/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { enviroment as ENV } from './../../../../environments/enviroments.dev';

@Component({
  selector: 'app-gestion-fisio',
  templateUrl: './gestion-fisio.component.html',
  styleUrls: ['./gestion-fisio.component.css']
})
export class GestionFisioComponent implements OnInit {

  @ViewChild("modalFisio", {static: false}) modalFisio!: TemplateRef<any>;

  posts = [
    {id:'1',nombre:'Jonathan',apellido1:'Angulo',apellido2:"Orduño",edad:"29",direccion:"direccionnnn",telefono:"6879899933",puntuacion:"puntuacion",correo:"correo1@gmail.com",RFC:"CURP102HLDNA1",telefono_casa:"6685768795",cedula:"cedula1",titulo:"titulo",certificados:"certificados.penege",especialidades:"especialidades.gif",anos_exp:"2",evidencia:"evidencia.io",disponibilidad:"20:12",fotografia:"./../../../assets/imagenes/mono.jpg",precio:"200",usuario:"mrjona1",contrasena:"nidninsoicm1",tipousuario:"Fisiologo"},
    {id:'2',nombre:'Antonio',apellido1:'Angulo',apellido2:"Orduño",edad:"29",direccion:"direccionnnn",telefono:"6879899933",puntuacion:"puntuacion",correo:"correo2@gmail.com",RFC:"CURP102HLDNA1",telefono_casa:"6685768795",cedula:"cedula2",titulo:"titulo",certificados:"certificados.penege",especialidades:"especialidades.gif",anos_exp:"2",evidencia:"evidencia.io",disponibilidad:"21:12",fotografia:"./../../../assets/imagenes/mono.jpg",precio:"200",usuario:"mrjona2",contrasena:"nidninsoicm2",tipousuario:"Fisiologo"},
    {id:'3',nombre:'Roberto',apellido1:'Angulo',apellido2:"Orduño",edad:"29",direccion:"direccionnnn",telefono:"6879899933",puntuacion:"puntuacion",correo:"correo3@gmail.com",RFC:"CURP102HLDNA1",telefono_casa:"6685768795",cedula:"cedula3",titulo:"titulo",certificados:"certificados.penege",especialidades:"especialidades.gif",anos_exp:"2",evidencia:"evidencia.io",disponibilidad:"23:12",fotografia:"./../../../assets/imagenes/mono.jpg",precio:"200",usuario:"mrjona3",contrasena:"nidninsoicm3",tipousuario:"Fisiologo"},
    {id:'4',nombre:'Jesus',apellido1:'Angulo',apellido2:"Orduño",edad:"29",direccion:"direccionnnn",telefono:"6879899933",puntuacion:"puntuacion",correo:"correo4@gmail.com",RFC:"CURP102HLDNA1",telefono_casa:"6685768795",cedula:"cedula4",titulo:"titulo",certificados:"certificados.penege",especialidades:"especialidades.gif",anos_exp:"2",evidencia:"evidencia.io",disponibilidad:"10:12",fotografia:"./../../../assets/imagenes/mono.jpg",precio:"200",usuario:"mrjona4",contrasena:"nidninsoicm4",tipousuario:"Fisiologo"},
  ];
  public formModificarFisio!: FormGroup;
  public DataFisios!:ListFisioCard[];
  public url:any;
  public Api = ENV.urlAPI;
  public formData = new FormData();
  public resPuptdFisio!:ApiResponse;
  constructor(
    private fb:FormBuilder,
    private modalService: NgbModal,
    private userService:UsersService,
    private mailerService:MailerService
  ) {

    this.userService.getAllUsersFCompletos().subscribe( r => {
      this.DataFisios = r.data;
      console.log(this.DataFisios);
      

      
    })

    
    this.formModificarFisio = this.fb.group( {
      id_fisio:[''],
      foto_:['',Validators.compose([
        Validators.required
       ])],
      nombre_:['',Validators.compose([
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
      direccion_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      telefono_:['',Validators.compose([
        Validators.required
      ])],
      punt_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      correo_:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      rfc_:['',Validators.compose([
        Validators.required
      ])],
      telcasa_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      cedula_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      titulo_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      certif_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      anos_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      evidencia_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      disponibilidad_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      precio_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],
      usuario_:['',Validators.compose([
        Validators.required
      ])],
      contrasena_:['',Validators.compose([
        Validators.required
      ])],
      tipoU_:['',Validators.compose([
        Validators.required,
        Validators.max(0)
      ])],

    })
   }

   mostrarModalInfo(post:any){
    
    //this.formModificarCliente.controls['foto_'].setValue(post.fotografia);
    //this.formModificarFisio.value.foto_= post.fotografia;
    this.modalService.open(this.modalFisio);
    this.url = this.Api + post.fotografia; 

    this.formModificarFisio.controls['id_fisio'].setValue(post.id_fisio);
    this.formModificarFisio.controls['nombre_'].setValue(post.nombre);
    this.formModificarFisio.controls['apellido1_'].setValue(post.apellido1);
    this.formModificarFisio.controls['apellido2_'].setValue(post.apellido2);
    this.formModificarFisio.controls['edad_'].setValue(post.edad);
    this.formModificarFisio.controls['direccion_'].setValue(post.direccion);
    this.formModificarFisio.controls['telefono_'].setValue(post.telefono);
    this.formModificarFisio.controls['punt_'].setValue(post.puntuacion);
    this.formModificarFisio.controls['correo_'].setValue(post.correo);
    this.formModificarFisio.controls['rfc_'].setValue(post.RFC);
    this.formModificarFisio.controls['telcasa_'].setValue(post.telefono_casa);
    //this.formModificarFisio.controls['cedula_'].setValue(post.cedula);
    //this.formModificarFisio.controls['titulo_'].setValue(post.titulo);
   // this.formModificarFisio.controls['certif_'].setValue(post.certificados);
    this.formModificarFisio.controls['anos_'].setValue(post.anos_exp);
   // this.formModificarFisio.controls['evidencia_'].setValue(post.evidencia);
    this.formModificarFisio.controls['disponibilidad_'].setValue(post.disponibilidad);
    this.formModificarFisio.controls['precio_'].setValue(post.precio);
    this.formModificarFisio.controls['usuario_'].setValue(post.usuario);
    this.formModificarFisio.controls['contrasena_'].setValue(post.contrasena);
    this.formModificarFisio.controls['tipoU_'].setValue(post.TipoUsuario);
  }
  subRegClient():void{
    console.log("Capturaste: ",this.formModificarFisio.value)

    this.formData.append('puntuacion',this.formModificarFisio.value.punt_);
    this.formData.append('nombre',this.formModificarFisio.value.nombre_);
    this.formData.append('apellido1',this.formModificarFisio.value.apellido1_);
    this.formData.append('apellido2',this.formModificarFisio.value.apellido2_);
    this.formData.append('edad',this.formModificarFisio.value.edad_);
    this.formData.append('direccion',this.formModificarFisio.value.direccion_);
    this.formData.append('telefono',this.formModificarFisio.value.telefono_);
    this.formData.append('correo',this.formModificarFisio.value.correo_);
    this.formData.append('RFC',this.formModificarFisio.value.rfc_);
    this.formData.append('telefono_casa',this.formModificarFisio.value.telcasa_);
    this.formData.append('disponibilidad',this.formModificarFisio.value.disponibilidad_);
    this.formData.append('anos_exp',this.formModificarFisio.value.anos_);
    this.formData.append('precio',this.formModificarFisio.value.precio_);
    this.formData.append('usuario',this.formModificarFisio.value.usuario_);
    this.formData.append('contrasena',this.formModificarFisio.value.contrasena_);
    this.formData.append('TipoUsuario',this.formModificarFisio.value.tipoU_);
    
    this.userService.updateFisio(this.formData,this.formModificarFisio.value.id_fisio).subscribe( (r) =>{

        console.log(r);

        setTimeout(() => window.location.reload(), 700);
    })

  }
  eliminar(id:any){
   console.log("Eliminaste ID:",id)
 }
  
  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }

      this.formData.append('fotografia',e.target.files[0]);
    }
  }



  banear(id:any,correo:any){

    const formDataBneo =  new FormData();

    formDataBneo.append('estatusCuenta',"2");
    this.userService.updateFisio(formDataBneo,id).subscribe( r => {
      console.log(r);

      if (!r.error) {
        
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Cliente baneado',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout( () => window.location.reload(),700);
      }
    })
  }


  
  desbanear(id:any,correo:any){

    const formMsgBaneo =  new FormData();
    formMsgBaneo.append('correoDes',correo);
    this.mailerService.messbaneoCuenta(formMsgBaneo).subscribe( r => {
      console.log(r);
    })

    const formDataBneo =  new FormData();

    formDataBneo.append('estatusCuenta',"1");
    this.userService.updateFisio(formDataBneo,id).subscribe( r => {
      console.log(r);

      if (!r.error) {
        
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: 'Cliente desbaneado',
          showConfirmButton: false,
          timer: 1500
        })

        setTimeout( () => window.location.reload(),700);
      }
    })

  }
  
  onselectFileC(e: any) {
    if (e.target.files) {

      this.formData.append('cedula',e.target.files[0]);
    }
  }

  onselectFileT(e: any) {
    if (e.target.files) {
      this.formData.append('titulo',e.target.files[0]);
    }
  }

  onselectFileCER(e: any) {
    if (e.target.files) {
      this.formData.append('certificados',e.target.files[0]);
    }
  }

  onselectFileESP(e: any) {
    if (e.target.files) {
      this.formData.append('especialidades',e.target.files[0]);
    }
  }
  onselectFileEVD(e: any) {
    if (e.target.files) {
      this.formData.append('evidencia',e.target.files[0]);
    }
  }
  cerrarmodal(){
    this.formModificarFisio.reset();
    this.formModificarFisio.controls['foto_'].setValue('');
    this.formModificarFisio.controls['cedula_'].setValue('');
    this.formModificarFisio.controls['titulo_'].setValue('');
    this.formModificarFisio.controls['certif_'].setValue('');
    this.formModificarFisio.controls['evidencia_'].setValue('');
    this.modalService.dismissAll();
  }

  ngOnInit(): void {

  }

}
