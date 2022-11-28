


import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cliTPinterface,LogIn } from 'app/data/interfaces/Interfaces';

 import { ApiService } from '@data/services/api/login/api.service'; 
import { Router } from '@angular/router';  
import { INTERNAL_ROUTES } from '@data/constants/routes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @HostBinding('class') clases = 'row';

  public formLogin: FormGroup;
  public tipoRegistro = INTERNAL_ROUTES.MODULO_TIPOREG;
  public logo = 'assets/imagenes/logo.png'
  returnUrl!: string; 
  headers!: string[];
message!:string;
  loginSumited!: boolean;

  constructor(private fb:FormBuilder,private router : Router,  
    private authService : ApiService) { 
console.log(this.tipoRegistro);
    
    this.formLogin = this.fb.group( {

      usuario:['',Validators.compose([
       Validators.required
      ])],
      contrasena:['',Validators.compose([
        Validators.required
      ])]

    })
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({  
      usuario: ['', Validators.required],  
      contrasena: ['', Validators.required]  
    });   
    this.authService.logout();  
  }

  // get f() { return this.formLogin.controls; }  

login(){
  console.log(this.formLogin.value)
  this.loginSumited = true;
  if (!this.formLogin.valid) {
    return;
  }

  console.log("AUTHENTICATE: " ,this.formLogin.value);
  this.authService.login(this.formLogin.value).subscribe( r=> {



    if(r.error){
      Swal.fire({
        icon: 'error',
        title: 'No se encontro ningun usuario',
        text: 'Revisa tu contraseña o usuario por favor!',
        footer: '❄ 🎁 🎅 🏂 ☃'
      })
    }
    //console.log(r);
  });
}
  




}
