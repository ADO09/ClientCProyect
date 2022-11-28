import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { USERS_DATA } from '@data/constants/users/users.const';
import { ListFisioCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { MailerService } from '@data/services/api/mails/mailer.service';
import { UsersService } from '@data/services/api/user/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { enviroment as ENV } from 'environments/enviroments.dev';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-fprofile',
  templateUrl: './user-fprofile.component.html',
  styleUrls: ['./user-fprofile.component.css']
})
export class UserFProfileComponent implements OnInit {
  public users!: ListFisioCard[];
  public id: number;
  public currentUser: ListFisioCard | undefined;
  public urlIMG = ENV.urlAPI;
  public formsendMessage!: FormGroup;
  public ListaFisios = INTERNAL_ROUTES.MODULO_PAGPRINCP;
  public condButtons: boolean = true;
  constructor(
    
    private route: ActivatedRoute,
    public modalMsg: NgbModal,
    private userService: UsersService,
    private fb: FormBuilder,
    private authService: ApiService,
    private mailerService:MailerService,
    private sanitizer: DomSanitizer,
  ) {

    this.id = +this.route.snapshot.params['id_fisio'];
    console.log(this.id);
    // console.log(this.users);
    // this.currentUser = this.users.find(user => user.id_fisio === this.id);
    // console.log(this.currentUser?.correo);
  }
  ModalSendMessage(contenido: any) {

    this.modalMsg.open(contenido, { centered: true })

  }

  ngOnInit(): void {

    this.userService.getoneUsersF(this.id).subscribe(r => {

      // console.log(r);
      if (!r.error) {
        this.currentUser = r.data;
        console.log(this.currentUser)
      }
      console.log(this.authService.getUser.id_fisio);
      if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
        if (this.authService.getUser.id_fisio == this.currentUser?.id_fisio) {
          this.condButtons = false;
        } else {
          this.condButtons = true;
        }
      }

     console.log( this.blobFile(this.urlIMG+this.currentUser?.cedula))

      this.formsendMessage = this.fb.group({
        correo: [this.currentUser?.correo, Validators.compose([
          Validators.required
        ])],
        asunto: ['', Validators.compose([
          Validators.required
        ])],
        mensaje: ['', Validators.compose([
          Validators.required
        ])],

      })
    });


  }


  
  SendMessage() {
    console.log(this.formsendMessage.value);

    const formData = new FormData();

    formData.append('correoDes',this.formsendMessage.value.correo);
    formData.append('correoRem',this.authService.getUser.correo);
    formData.append('asunto',this.formsendMessage.value.asunto);
    formData.append('mensaje',this.formsendMessage.value.mensaje);
    formData.append('nombre',this.authService.getUser.nombre);

    this.mailerService.SendMessage(formData).subscribe( (r) =>{
      console.log(r);
      if (!r.error) {
        Swal.fire({
          
          icon: 'success',
          title: 'Mensaje enviado',
          showConfirmButton: false,
          timer: 1500
        })

        this.modalMsg.dismissAll();
      }
    })
    
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



