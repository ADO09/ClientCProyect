export interface cliTPinterface {
    id_cliente?: number;
    nombre:string;
    apellido1:string;
    apellido2:string;
    edad:number;
    telefono:string;
    correo:string;
    curp:string;
    usuario:string;
    fotografia:any;
    contrasena:string;
    TipoUsuario?:string;
    favoritos?:any;
    TemaPagina?:any;
    estatusCuenta?:any;

}




export interface comment  {

  idcomments?:any;
  id_fisio?:any;
  id_clienteCom?:any;
  id_fisioCom?:any;
  puntuacion?:any;
  comentario?:any;
  fecha?:any;
  nombre?:any;
  fotografia?:any;
}


export interface Config {
    heroesUrl: string;
    textfile: string;
    date: any;
  }

  export interface LogIn {
    usuario:string;
    contra:string;
  }

  export interface ApiResponse{
    id_fisio?: number;
    id_cliente?:number;
    id:number;
    usuario:string;
    contraseña:string;
    TipoUsuario:string;
    correo:string;
    nombre:string;
    fotografia:any;
    TemaPagina?:any;
    favoritos: any ;
    estatusCuenta?: any ;
  }


  export interface ListFisioCard {

    id_fisio?: number;
    nombre:string;
    apellido1:string;
    apellido2:string;
    edad:number;
    direccion:string; //este
    telefono:string;
    puntuacion:number;
    correo:string;
    RFC:string;
    telefono_casa:string;
    cedula:string;
    titulo:string;
    certificados:string;
    especialidades:string;
    anos_exp:number;
    evidencia:string;
    disponibilidad:string;
    fotografia:string;
    precio:number;   //este
    usuario:string;
    contrasena:string;
    TipoUsuario:string;
    TemaPagina?:any;
    estatusCuenta?:any;
    
  }

  export interface ListCitaCard {
    num_cita?:number;
    id_cita:number;
    id_fisio:number;
    id_cliente:number;
    id_plan?:any;
    nombre:string;
    apellido1:string;
    apellido2:string;
    curp:string;
    fecha:any;
    hora:any;
    descripcion:string;
    tipo_consulta:string;
    estatus:string;
    direccion:string;
    correo?:any;
    costo?:any;
    estatusCuenta:any;
    usuario?:any;
  }

  export interface ListPlanCard {
    id_plan:number;
    id_fisio?:number;
    nombre_plan:any;
    descripcion:string;
    diagnostico:string;
    tiempo:string;
    nivelDolor:string;
    enfermedades?:string;
    descripcion_plan:any;
  }


  export interface ListCitaCardC {
    num_cita?:number;
    id_cita:number;
    id_fisio:number;
    id_cliente:number;
    nombre:string;
    apellido1:string;
    apellido2:string;
    RFC:string;
    fecha:any;
    hora:any;
    descripcion:string;
    tipo_consulta:string;
    estatus:string;
    direccion?:string;
    id_plan?:any;
    correo?:any;
    costo?:any;
    estatusCuenta:any;
    usuario?:any;
  }

  export interface ExpMedicoInterface {
    num_cita?:number;
    id_cita:number;
    id_fisio:number;
    id_cliente:number;
    nombre_plan:string;
    fecha:any;
    hora:any;
    descripcion:string;
    tipo_consulta:string;
    direccion?:string;
    id_plan?:any;
    diagnostico:string;
    nivelDolor:string;
    descripcion_plan:string;
    enfermedades:string;
    tiempo:string;
    nombre:string;
    apellido1:string;
    apellido2:string;
    correo:string;
    telefono:string;
    
  }

  
  export interface userSendMessageInterface {

    nombre:any;
    apellido1?:any;
    id_user:any;
    usuario:any;
    TipoUsuario:any;
    fotografia:any;
  }
  


  export interface Chat {
    id?: string;
    username: string;
    id_fisio?: any;
    id_cliente?: any;
    tipo_usuario?:any;
    userF?:any;
    userC:any;
    message: string;
    timestamp: Date;
    fotografia?:any;
  }


