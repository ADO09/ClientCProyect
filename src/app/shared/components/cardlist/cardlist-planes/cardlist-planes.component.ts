import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ListPlanCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { PlanesRehabilitacionService } from '@data/services/api/planes/planes-rehabilitacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cardlist-planes',
  templateUrl: './cardlist-planes.component.html',
  styleUrls: ['./cardlist-planes.component.css']
})
export class CardlistPlanesComponent implements OnInit {

  @Input() dataPlan!:ListPlanCard;
  // @Input() actDatos!:any;
  constructor(
    public modalF:NgbModal,
    private planesService:PlanesRehabilitacionService,
    private authService:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  ModalOpenFisio(contenido:any){
     
    this.modalF.open(contenido,{centered:true})
    
  }

  subupdatePlan(tiempo:any,nombre_plan:any,descripcion:any,diagnostico:any,nivelDolor:any){

    console.log(this.dataPlan.id_plan);
    console.log(tiempo);
    console.log(nombre_plan);
    console.log(descripcion);
    console.log(diagnostico);
    console.log(nivelDolor);

    const  formData:any = new FormData();

    formData.append('tiempo',tiempo);
    formData.append('nombre_plan',nombre_plan);
    formData.append('descripcion_plan',descripcion);
    formData.append('diagnostico',diagnostico);
    formData.append('nivelDolor',nivelDolor);


    Swal.fire({
     
      title: 'Estas seguro de los datos?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.planesService.updPlan(formData,this.dataPlan.id_plan).subscribe( r=>{
          console.log(r);

          if (!r.error) {
            Swal.fire('Se a actualizado con exito!', '', 'success')
            setTimeout(() =>  this.modalF.dismissAll() , 1000); 
            setTimeout(() => this.router.navigateByUrl( INTERNAL_ROUTES.MODULO_PAGPRINCF) , 1500); 
            
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
   
   
    
  }


  

  elmPlan(){

    
    Swal.fire({
     
      title: 'Estas seguro de eliminar el plan?',
      icon: 'info',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this.planesService.estatusPlan(this.dataPlan.id_plan).subscribe( r=>{
          console.log(r);

          if (!r.error) {
            Swal.fire('Se a eliminado con exito!', '', 'success',);
            setTimeout(() =>  this.modalF.dismissAll() , 1000); 
            setTimeout(() => this.router.navigateByUrl( INTERNAL_ROUTES.MODULO_PAGPRINCF) , 1500); 
            // event();
           
          }
        })
        // this.actDatos();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
