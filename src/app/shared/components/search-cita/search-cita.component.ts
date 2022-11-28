import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-cita',
  templateUrl: './search-cita.component.html',
  styleUrls: ['./search-cita.component.css']
})
export class SearchCitaComponent implements OnInit {
public enterdSearchValue ='';
  constructor() { }

  ngOnInit(): void {
  }
  @Output()
  searchTextChanged:EventEmitter<string> = new EventEmitter <string>();

  onsearchTextChanged(){
    this.searchTextChanged.emit(this.enterdSearchValue)
  }
}
