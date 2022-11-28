import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ListFisioCard } from '@data/interfaces';
import { CitasServicesTsService } from '@data/services/api/citas/citas-services.ts.service';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { enviroment as ENV } from 'environments/enviroments.dev';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-fisiocard',
  templateUrl: './list-fisiocard.component.html',
  styleUrls: ['./list-fisiocard.component.css']
})
export class ListFisiocardComponent implements OnInit {

  public condUser = '';
  public urlIMG = ENV.urlAPI;
  public formRegistroCita!: FormGroup;
  public formData = new FormData();
  public actPuntuacion!:any;
  @Input() data!:ListFisioCard;
  @Input() favBoleano!:boolean;
   perfilFisio = `${INTERNAL_ROUTES.MODULO_PERFILFISIOS}`;
    regCita = INTERNAL_ROUTES.MODULO_CITASREGISTRO;
  constructor(
    private userService:UsersService,
    private authService:ApiService,
    public modalC:NgbModal,
    public citaService:CitasServicesTsService,
    private fb: FormBuilder,
    private router:Router
  ) { 
     console.log(this.perfilFisio);

     this.formRegistroCita = fb.group({
      fecha: ['', Validators.compose([
        Validators.required
      ])],
      hora: ['', Validators.compose([
        Validators.required
      ])],
      descripcion: ['', Validators.compose([
        Validators.required
      ])],
      direccion: ['', Validators.compose([
        Validators.required
      ])],
      tipo_consulta: ['', Validators.compose([
        Validators.required
      ])],

    })
    
     if (authService.getUser.TipoUsuario=='fisioterapeuta') {
        this.condUser = '2';
     } else if (authService.getUser.TipoUsuario=='cliente') {
    
        this.condUser ='1'
    
     }
    //console.log(+this.data.id_fisio!);
  }

  ngOnInit(): void {
  }

  add(id?:any){

    this.userService.getonePuntF(id).subscribe(r =>{
       this.actPuntuacion = r.data.puntuacion + 1;
     console.log(this.actPuntuacion);
     const formData = new FormData();
     formData.append('puntuacion',this.actPuntuacion);
    console.log(formData.get('puntuacion'));
    this.userService.updateFisio(formData,id).subscribe( r=>{
      console.log(r)
    })
    })
    
    
   
      this.userService.getAllfavF(id);
    
  }

  elm(id?:any){
    var elmfavs:any;
    var cadena:string = '';

    this.userService.getonePuntF(id).subscribe(r =>{
      this.actPuntuacion = r.data.puntuacion - 1;
      const formData = new FormData();
      formData.append('puntuacion',this.actPuntuacion);
      this.userService.updateFisio(formData,id).subscribe( r=>{
        console.log(r)
      })
   })
   

    if (this.authService.getUser.favoritos.left<0) {
      console.log('no hay favoritos')
    } else {
       elmfavs =  this.authService.getUser.favoritos.substring(0,this.authService.getUser.favoritos.length - 1).split(',');
    console.log(elmfavs);
    
    
    const index = elmfavs.indexOf(id.toString());
    console.log(index);
    if (index > -1) {
      elmfavs.splice(index, 1);
   }

   for (let i = 0; i < elmfavs.length; i++) {
    cadena += elmfavs[i] + ','
    
   }

   this.authService.getUser.favoritos = cadena;
    console.log(elmfavs);
    console.log(cadena);
    console.log(this.authService.getUser.favoritos);
    this.authService.setUserToLocalStorage(this.authService.getUser);
  
    this.userService.getAllUsersfavsFBut(cadena).subscribe( r =>{

    console.log(r);
    if (!r.error) {
      Swal.fire({
        icon: 'success',
        title: 'Eliminado de favoritos',
        showConfirmButton: false,
        timer: 750
      })

      setTimeout(() => window.location.reload(), 900);
    }
   
   })

    }

   
    
    
  }

  subregCit(){
    console.log(this.formRegistroCita.value);
    const idC:any = this.authService.getUser.id_cliente;
    const idF:any =  this.data.id_fisio;
    const prCita:any = this.data.precio;
    this.formData.append('id_fisio',idF );
    this.formData.append('id_cliente',idC );
    this.formData.append('tipo_consulta', this.formRegistroCita.value.tipo_consulta);
    this.formData.append('direccion', this.formRegistroCita.value.direccion);
    this.formData.append('fecha', this.formRegistroCita.value.fecha);
    this.formData.append('hora', this.formRegistroCita.value.hora + ':00');
    this.formData.append('descripcion', this.formRegistroCita.value.descripcion);
    this.formData.append('estatus', '3');
    this.formData.append('costo',prCita);

  console.log(this.formData.get('id_fisio'));
    console.log( this.formData.get('id_cliente' ));
    console.log(this.formData.get('tipo_consulta'));
    console.log( this.formData.get('fecha'));
    console.log(this.formData.get('hora'));
    console.log(this.formData.get('descripcion'));
    console.log(this.formData.get('direccion'));
    console.log(this.formData.get('estatus'));
    console.log(this.formData.get('costo'));

    this.citaService.addCita(this.formData).subscribe(r =>{

      console.log(r);
      if (!r.error) {
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.modalC.dismissAll();
         
        }, 500)
      
        setTimeout(() => {

          this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_CITASHISTORIAL);
        }, 1500)
      }
    })

  }

  ModalOpenCliente(contenidoC:any){
    this.modalC.open(contenidoC,{centered:true})
    
  }

}
