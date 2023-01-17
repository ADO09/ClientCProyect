import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@data/services/api/user/users.service';
import { cliTPinterface } from '@data/interfaces/Interfaces';
import { enviroment as ENV } from './../../../../environments/enviroments.dev';
import Swal from 'sweetalert2';
import { MailerService } from '@data/services/api/mails/mailer.service';
@Component({
  selector: 'app-gestion-paciente',
  templateUrl: './gestion-paciente.component.html',
  styleUrls: ['./gestion-paciente.component.css']
})
export class GestionPacienteComponent implements OnInit {
  
  public clientesData!:cliTPinterface[];
  filterPost = '';
  public  formData = new FormData();
  public Api = ENV.urlAPI;
  // posts = [
  //   {id:'1',fotografia:"./../../../assets/imagenes/archivo.png",nombre:'Jonathan',apellido1:'Angulo',apellido2:"Orduño",edad:"29",telefono:"6879899933",correo:"correo1@gmail.com",curp:"CURP102930HSLLDNA1",usuario:"mrjona",contrasena:"nidninsoicm"},
  //   {id:'2',fotografia:"./../../../assets/imagenes/apelllidos.png",nombre:'Jesus',apellido1:'Roberto',apellido2:"Hijar",edad:"22",telefono:"6684567833",correo:"correo2@gmail.com",curp:"AURP102930HSLLDNA1",usuario:"chuy",contrasena:"asdasd"},
  //   {id:'3',fotografia:"./../../../assets/imagenes/telefono.png",nombre:'Luis',apellido1:'Padilla',apellido2:"Angulo",edad:"48",telefono:"6834567833",correo:"correo3@gmail.com",curp:"SURP102930HSLLDNA1",usuario:"lui",contrasena:"kodopds485"},
  //   {id:'4',fotografia:"./../../../assets/imagenes/edad.png",nombre:'Antonio',apellido1:'Angulo',apellido2:"Orduño",edad:"16",telefono:"1234899933",correo:"correo4@gmail.com",curp:"UURP102930HSLLDNA1",usuario:"tono",contrasena:"ask3jm4"},
  //   {id:'5',fotografia:"./../../../assets/imagenes/foto.png",nombre:'Roberto',apellido1:'Angulo',apellido2:"Orduño",edad:"35",telefono:"9876899933",correo:"correo5@gmail.com",curp:"VURP102930HSLLDNA1",usuario:"robe",contrasena:"sad83hjr"}
  // ];

  
  public formModificarCliente!: FormGroup;
  @ViewChild("modalPaciente", {static: false}) modalPaciente!: TemplateRef<any>;
 
  constructor(
    private fb:FormBuilder,
    private modalService: NgbModal,
    private userService:UsersService,
    private mailerService:MailerService
    
  ) {

    this.userService.getAllUsersC().subscribe((r) => {
      console.log(r.data);
      this.clientesData = r.data;
    })
    this.formModificarCliente = fb.group( {
      id_cliente_:['',Validators.compose([
        Validators.required
       ])],
      foto_:['',Validators.compose([
        Validators.required
       ])],
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
        Validators.required
      ])],
      correo_:['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      curp_:['',Validators.compose([
        Validators.required
      ])],
      usuario_:['',Validators.compose([
        Validators.required
      ])],
      contrasena_:['',Validators.compose([
        Validators.required
      ])]

    })
  }
  mostrarModalInfo(post:any){
    console.log(post.fotografia);
   
    this.formModificarCliente.controls['id_cliente_'].setValue(post.id_cliente);
    this.formModificarCliente.controls['nombre_'].setValue(post.nombre);
    this.formModificarCliente.controls['apellido1_'].setValue(post.apellido1);
    this.formModificarCliente.controls['apellido2_'].setValue(post.apellido2);
    this.formModificarCliente.controls['edad_'].setValue(post.edad);
    this.formModificarCliente.controls['telefono_'].setValue(post.telefono);
    this.formModificarCliente.controls['correo_'].setValue(post.correo);
    this.formModificarCliente.controls['curp_'].setValue(post.curp);
    this.formModificarCliente.controls['usuario_'].setValue(post.usuario);
    this.formModificarCliente.controls['contrasena_'].setValue(post.contrasena);
    this.modalService.open(this.modalPaciente);
    this.url=ENV.urlAPI+post.fotografia;
    console.log(this.formModificarCliente.value)
  }
  subRegClient():void{
    console.log("Capturaste: ",this.formModificarCliente.value)


    

    this.formData.append('nombre',this.formModificarCliente.value.nombre_);
    this.formData.append('apellido1',this.formModificarCliente.value.apellido1_);
    this.formData.append('apellido2',this.formModificarCliente.value.apellido2_);
    this.formData.append('edad',this.formModificarCliente.value.edad_);
    this.formData.append('telefono',this.formModificarCliente.value.telefono_);
    this.formData.append('correo',this.formModificarCliente.value.correo_);
    this.formData.append('curp',this.formModificarCliente.value.curp_);
    this.formData.append('usuario',this.formModificarCliente.value.usuario_);
    this.formData.append('contrasena',this.formModificarCliente.value.contrasena_);

    console.log(this.formData.get('fotografia'))


    this.userService.updateClient(this.formData,this.formModificarCliente.value.id_cliente_).subscribe( (r) =>{

      console.log(r);

       setTimeout(() => window.location.reload(), 500);
    })
    
    

  }
  searchText:string = '';

  onSearchTextEntered(searvalue:string){
    this.searchText = searvalue;
    console.log(this.searchText);
  }

  eliminar(id:string){
    console.log("Eliminaste ID:",id)
  }


  banear(id:any,correo:any){

    const formDataBneo =  new FormData();

    formDataBneo.append('estatusCuenta',"2");
    this.userService.updateClient(formDataBneo,id).subscribe( r => {
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
    this.userService.updateClient(formDataBneo,id).subscribe( r => {
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
  url="";
  onselectFile(e:any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }

      this.formData.append('fotografia',e.target.files[0]);
    }

  

    // this.formModificarCliente.value.foto_ = e.target.files[0];
    // console.log(this.formModificarCliente.value.foto_);
  }
  cerrarmodal(){
    this.formModificarCliente.reset();
    // this.formModificarCliente.controls['foto_'].setValue('');
    this.modalService.dismissAll();
  }

 

  ngOnInit(): void {
  }
limpiar(){
  
}
 
}
