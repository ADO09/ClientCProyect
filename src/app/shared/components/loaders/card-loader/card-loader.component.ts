import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.css']
})
export class CardLoaderComponent implements OnInit {


  //INPUT STYLES

  @Input() imageSize = 75;
  @Input() barHeight = 15;
  @Input() bars = 10;
  
  //Finals propeties
  public totalBars:number[] = [];
  public finalStyleImage = {};
  public finalStyleBar = {};

  constructor() { }

  ngOnInit(): void {

    // calculate total bars

    for (let i = 0; i < this.bars; i++) {
      
      this.totalBars.push(i);
      
    }


    this.finalStyleImage = {
      width: `${this.imageSize}px`,
      height: `${this.imageSize}px`,
    };

    this.finalStyleBar = {
      height: `${this.barHeight}px`,
    };
    
  }

}
