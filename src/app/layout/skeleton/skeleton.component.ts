import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@data/services/api/login/api.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements AfterViewInit, OnInit {


  
  public showLeftNav :boolean =  true;
  
  public $theme: 'yellow'|'red'| 'dark'|'blue-dark'  = this.authService.getUser.TemaPagina;
  public isLoading = true;
  public loader = 'assets/imagenes/loader3.gif'
  constructor(
   private authService:ApiService
  ) { 

    // console.log(this.authService.getUser)
    this.authService.setUserToLocalStorage(this.authService.getUser);
   
  }

  
 
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // window.location.reload();
    setTimeout(()=>{
      this.isLoading = false;
    },1000);

  }

  showMenu(){
    this.showLeftNav = !this.showLeftNav;
  }

}
