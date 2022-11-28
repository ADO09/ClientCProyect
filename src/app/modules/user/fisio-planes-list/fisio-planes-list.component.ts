import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMAGES_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ListPlanCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { PlanesRehabilitacionService } from '@data/services/api/planes/planes-rehabilitacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardlistPlanesComponent } from '@shared/components/cardlist/cardlist-planes/cardlist-planes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fisio-planes-list',
  templateUrl: './fisio-planes-list.component.html',
  styleUrls: ['./fisio-planes-list.component.css']
})
export class FisioPlanesListComponent implements OnInit {

  // @ViewChild(CardlistPlanesComponent)cardList:any;
  public dataP!: ListPlanCard[];
  public img = IMAGES_ROUTES.IMAGENADDPLAN;
  public formAddPlan!: FormGroup;

  constructor(
    public modalF: NgbModal,
    private planService: PlanesRehabilitacionService,
    private authService: ApiService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.planService.getAllPlanF(this.authService.getUser.id_fisio).subscribe(r => {
      console.log(r);

      this.dataP = r.data;


      this.formAddPlan = fb.group({
        tiempo: ['', Validators.compose([
          Validators.required
        ])],
        nombre_plan: ['', Validators.compose([
          Validators.required
        ])],
        descripcion: ['', Validators.compose([
          Validators.required
        ])],
        diagnostico: ['', Validators.compose([
          Validators.required
        ])],
        nivelDolor: ['', Validators.compose([
          Validators.required
        ])],
        enfermedades: ['', Validators.compose([
          Validators.required
        ])],
      })
    })



  }

  ngOnInit(): void {
    // this.cardList.elmPlan(() =>{
    //   this.planService.getAllPlanF(this.authService.getUser.id_fisio).subscribe( r =>{
    //     console.log(r);

    //     this.dataP = r.data;
    //   })
    // })
    // console.log(this.cardList);
  }

  ModalOpenFisio(contenido: any) {

    this.modalF.open(contenido, { centered: true })

  }

  searchText: string = '';
  onSearchTextEntered(searvalue: string) {
    this.searchText = searvalue;
    console.log(this.searchText);
  }

  subAddtePlan() {
    console.log(this.formAddPlan.value);

    const formData = new FormData();
    const id:any = this.authService.getUser.id_fisio;
    formData.append('id_fisio',id);
    formData.append('tiempo', this.formAddPlan.value.tiempo);
    formData.append('nombre_plan', this.formAddPlan.value.nombre_plan);
    formData.append('descripcion_plan', this.formAddPlan.value.descripcion);
    formData.append('diagnostico', this.formAddPlan.value.diagnostico);
    formData.append('nivelDolor', this.formAddPlan.value.nivelDolor);
    formData.append('enfermedades', this.formAddPlan.value.enfermedades);


    this.planService.AddPlan(formData).subscribe( r=>{

      if (!r.error) {
        Swal.fire({
          icon: 'success',
          title: 'Plan agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() =>  this.modalF.dismissAll() , 1000); 
        setTimeout(() => this.router.navigateByUrl( INTERNAL_ROUTES.MODULO_PAGPRINCF) , 2000); 
        
      }
    })
  }

  // actDatos():any{
  //   console.log(this.authService.getUser.id_fisio);

  //   return this.planService.getAllPlanF(this.authService.getUser.id_fisio).subscribe( r =>{
  //      console.log(r);

  //      this.dataP = r.data;
  //    })

  // }

}
