import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { cliTPinterface, ListFisioCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { MailerService } from '@data/services/api/mails/mailer.service';
import { UsersService } from '@data/services/api/user/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { enviroment as ENV } from 'environments/enviroments.dev';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-cprofile',
  templateUrl: './user-cprofile.component.html',
  styleUrls: ['./user-cprofile.component.css']
})
export class UserCprofileComponent implements OnInit {
  public users!: cliTPinterface[];
  public id!: number;
  public currentUser: cliTPinterface | undefined;
  public urlIMG = ENV.urlAPI;
  public ListaFisios = INTERNAL_ROUTES.MODULO_PAGPRINCP;
  public ExpMedico = INTERNAL_ROUTES.MODULO_EXPMEDICO;
  public formsendMessage!: FormGroup;
  public condButtons: boolean = true;
  constructor(
    public modalMsg: NgbModal,
    private route: ActivatedRoute,
    private userService: UsersService,
    private fb: FormBuilder,
    private authService: ApiService,
    private mailerService:MailerService
  ) {



    this.id = +this.route.snapshot.params['id_cliente'];
  }

  ModalSendMessage(contenido: any) {

    this.modalMsg.open(contenido, { centered: true })

  }
  ngOnInit(): void {



    this.userService.getoneUsersC(this.id).subscribe((r) => {



      // console.log(r);
      if (!r.error) {
        this.currentUser = r.data;
        console.log(this.currentUser)
      }
      if (this.authService.getUser.TipoUsuario == 'cliente') {
        if (this.authService.getUser.id_cliente == this.currentUser?.id_cliente) {
          this.condButtons = false;
        } else {
          this.condButtons = true;
        }
      }


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


}
