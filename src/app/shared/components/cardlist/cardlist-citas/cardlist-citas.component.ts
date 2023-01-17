import { Component, Input, OnInit,NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';

import { ListCitaCard, ListCitaCardC, ListPlanCard } from '@data/interfaces';
import { CitasServicesTsService } from '@data/services/api/citas/citas-services.ts.service';
import { ApiService } from '@data/services/api/login/api.service';
import { MailerService } from '@data/services/api/mails/mailer.service';
import { PlanesRehabilitacionService } from '@data/services/api/planes/planes-rehabilitacion.service';
import { ChatService } from '@data/services/chatfirebase/chat.service';

import { NgbModal,NgbDatepicker,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cardlist-citas',
  templateUrl: './cardlist-citas.component.html',
  styleUrls: ['./cardlist-citas.component.css']
})
export class CardlistCitasComponent implements OnInit {
  @Input() data!: ListCitaCard ;
  @Input() dataC!: ListCitaCardC;
  

  public dateCita:any;
  public  formData:any = new FormData();
  
  //public dateS: number;
  public numCitas: number = 0;
  public condUser: boolean = true;
  public model!: NgbDateStruct
  public dataPlan!:ListPlanCard[];
  public PlanData!:ListPlanCard;
  public perfilPaciente:any = INTERNAL_ROUTES.MODULO_PERFILCLIENTES;
  public perfilFisio:any = INTERNAL_ROUTES.MODULO_PERFILFISIOS;

  constructor(
    private authService: ApiService,
    public modalF:NgbModal,
    public modalC:NgbModal,
    public citasService:CitasServicesTsService,
    public planesService:PlanesRehabilitacionService,
    public mailService:MailerService,
    // private chatComponent:ChatComponent,
    private chatService:ChatService,
    private router:Router
  ) {

    const Swal = require('sweetalert2')
    //this.numCitas += 1
    ////console.log(this.numCitas)
   // this.dateS = (new Date()).getTime();
   // //console.log(this.dateS);

      
    if (authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.condUser = true;
      this.planesService.getAllPlanF(this.authService.getUser.id_fisio).subscribe(r => {
        // //console.log(r);
        this.dataPlan = r.data;
        //console.log(this.dataPlan);
      })
    } else if (authService.getUser.TipoUsuario == 'cliente') {
      this.condUser = false;
   
    }


 

   
   
    
  }

  ngOnInit(): void {
   // //console.log(this.data.id_plan);

if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
  this.planesService.getOnePlanF(this.data.id_plan).subscribe( r=> {
    //console.log(r);
    this.PlanData = r.data;
  })
} else {
  //console.log(this.dataC.id_fisio);
  this.planesService.getAllPlanF(this.dataC.id_fisio).subscribe(r => {
     //console.log(r);
      this.dataPlan = r.data;
    ////console.log(this.dataPlan);
  })
  this.planesService.getOnePlanF(this.dataC.id_plan).subscribe( r=> {
    //console.log(r);
    this.PlanData = r.data;
  })
}
   
  }

  

  datos(data:any){
     this.dateCita = this.data.fecha.pipe;
    
  }

  ModalOpenFisio(contenido:any){
     console.log(this.data)
    this.modalF.open(contenido,{centered:true})
    
  }
  dataIdPlanChange(e:any){

    if (this.data.id_plan === 0) {
      console.log(e.target.value);
    this.data.id_plan = e.target.value;
    }
    
  }

  cancid_plan(){
    if (this.data.id_plan === 0) {
      this.data.id_plan = 0;
    }
   
  }

  // ,costo:any
  subupdateCit(fecha:any,hora:any,descripcion:any,direccion:any,tipo_consulta:any,id_plan:any){

    this.formData.append('id_fisio', this.data.id_fisio);
    this.formData.append('id_cliente', this.data.id_cliente );
    this.formData.append('fecha',fecha);
    this.formData.append('hora',hora + ':00');
    this.formData.append('descripcion',descripcion);
    this.formData.append('tipo_consulta',tipo_consulta);
    this.formData.append('estatus', this.data.estatus);
    this.formData.append('direccion',direccion);

    if (id_plan != '---Select a plan---') {
      this.formData.append('id_plan',id_plan);
      console.log(id_plan)
    }
   
    // this.formData.append('costo',id_plan);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.citasService.uptdCitaFisio(this.data.id_cita,this.formData).subscribe(r =>{
          // //console.log(r)
    
          
          if (!r.error) {
            this.data.fecha = fecha;
            this.data.hora = hora;
            this.data.descripcion = descripcion;
            this.data.tipo_consulta = tipo_consulta;
            this.data.direccion = direccion;
           window.location.reload();
          }
    
    
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')

        this.formData.delete('id_fisio');
        this.formData.delete('id_cliente');
        this.formData.delete('fecha');
        this.formData.delete('hora');
        this.formData.delete('descripcion');
        this.formData.delete('tipo_consulta');
        this.formData.delete('estatus');
        this.formData.delete('direccion');
    
        if (id_plan != '---Select a plan---') {
          this.formData.delete('id_plan',id_plan);
          console.log(id_plan)
        }
      }
    })



  }

  elmCita(id?:any){

    Swal.fire({
      title: 'esta seguro de que quiere eliminar la cita?',
      showDenyButton: true,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       
        this.citasService.delCitasF(id).subscribe(r =>{
          // //console.log(r)

          if (!r.error) {
            Swal.fire('Cita eliminada!', '', 'success')
            setTimeout(() => window.location.reload(), 2000);
            
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  citaStatus(estatus:any,msj?:string){
    var mensaje = '';
    if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.formData.append('id_fisio', this.data.id_fisio);
      this.formData.append('id_cliente', this.data.id_cliente );
      this.formData.append('fecha',this.data.fecha.substring(0,9));
      this.formData.append('hora',this.data.hora);
      this.formData.append('descripcion',this.data.descripcion);
      this.formData.append('tipo_consulta',this.data.tipo_consulta);
      this.formData.append('estatus', estatus);
      this.formData.append('direccion',this.data.direccion);
    }else{
      this.formData.append('id_fisio', this.dataC.id_fisio);
      this.formData.append('id_cliente', this.dataC.id_cliente );
      this.formData.append('fecha',this.dataC.fecha.substring(0,9));
      this.formData.append('hora',this.dataC.hora);
      this.formData.append('descripcion',this.dataC.descripcion);
      this.formData.append('tipo_consulta',this.dataC.tipo_consulta);
      this.formData.append('estatus', estatus);
      this.formData.append('direccion',this.dataC.direccion);
    }
   
  

    if (msj=='1') {
      mensaje='Seguro que quieres rechazar la cita?'
    }
    if (msj=='2') {
      mensaje='Quieres aceptar esta cita?'
    }
    if (msj=='3') {
      mensaje='Seguro que quieres eliminar esta cita?'
    }
    if (msj=='4') {
      mensaje='finalizar esta cita?'
    }
    Swal.fire({
     
      title: mensaje,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Accion realizada con exito!', '', 'success')
        if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
          this.citasService.uptdCitaFisio(this.data.id_cita,this.formData).subscribe(r =>{
          // console.log('bien2');
          
            // //console.log(r)
            if (!r.error) {
              // this.data = {} as ListCitaCard;
              const formdataMsgActF = new FormData();

              formdataMsgActF.append('correoDes',this.data.correo);
              formdataMsgActF.append('fecha',this.data.fecha.substring(0,9));
              formdataMsgActF.append('hora',this.data.hora);
              formdataMsgActF.append('descripcion',this.data.descripcion);
              formdataMsgActF.append('direccion',this.data.direccion);
              formdataMsgActF.append('nombre',this.authService.getUser.nombre);
              formdataMsgActF.append('correoRem',this.authService.getUser.correo);
              
              this.mailService.MessageAcptFisio(formdataMsgActF).subscribe( (r) =>{
              //  console.log(r);
              })
              setTimeout(location.reload.bind(location), 1300);
            }
          })
        
        }else{
          this.citasService.uptdCitaFisio(this.dataC.id_cita,this.formData).subscribe(r =>{
    
            // //console.log(r)
            if (!r.error) {
              const formdataMsgActC = new FormData();
  
              formdataMsgActC.append('correoDes',this.dataC.correo);
              formdataMsgActC.append('fecha',this.dataC.fecha.substring(0,9));
              formdataMsgActC.append('hora',this.dataC.hora);
              formdataMsgActC.append('descripcion',this.dataC.descripcion);
              formdataMsgActC.append('nombre',this.authService.getUser.nombre);
              formdataMsgActC.append('correoRem',this.authService.getUser.correo);
              
              this.mailService.MessageAcptClient(formdataMsgActC).subscribe( (r) =>{
              //  console.log(r);
              })
              setTimeout(location.reload.bind(location), 1300);
            }
          })
      
        }
     
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  

  }

  
  
  citaStatusC(estatus:any,msj?:string){
    var mensaje = '';
    this.formData.append('id_fisio', this.dataC.id_fisio);
    this.formData.append('id_cliente', this.dataC.id_cliente );
    this.formData.append('fecha',this.dataC.fecha.substring(0,9));
    this.formData.append('hora',this.dataC.hora);
    this.formData.append('descripcion',this.dataC.descripcion);
    this.formData.append('tipo_consulta',this.dataC.tipo_consulta);
    this.formData.append('estatus', estatus);
    this.formData.append('direccion',this.dataC.direccion);

    if (msj=='1') {
      mensaje='Seguro que quieres rechazar la cita?'
    }
    if (msj=='2') {
      mensaje='Quieres aceptar esta cita?'
    }
    if (msj=='3') {
      mensaje='Seguro que quieres eliminar esta cita?'
    }
    if (msj=='4') {
      mensaje='finalizar esta cita?'
    }
    Swal.fire({
     
      title: mensaje,
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Accion realizada con exito!', '', 'success')
        this.citasService.uptdCitaFisio(this.dataC.id_cita,this.formData).subscribe(r =>{
    
          // //console.log(r)
          if (!r.error) {
            
            setTimeout(location.reload.bind(location), 1000);
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  

  }


  ModalOpenCliente(contenidoC:any){
    this.modalC.open(contenidoC,{centered:true})

  }


  chat(){
    // this.chatComponent.setUsuario(this.data.id_cliente);
    this.chatService.setUsuario = this.data.usuario;
    this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_CHAT);
  }


  chatC(){
    // this.chatComponent.setUsuario(this.data.id_cliente);
    this.chatService.setUsuario = this.dataC.usuario;
    this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_CHAT);
  }

}
