import { Component, OnInit } from '@angular/core';
import { IMAGES_ROUTES } from '@data/constants/routes';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  logo = IMAGES_ROUTES.LOGO;
  constructor() { }

  ngOnInit(): void {
  }

}
