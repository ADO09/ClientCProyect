import { Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct,NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ngbd-datepicker-popup',
  templateUrl: './ngbd-datepicker-popup.component.html',
  styleUrls: ['./ngbd-datepicker-popup.component.css']
})
export class NgbdDatepickerPopupComponent implements OnInit {
  model!: NgbDateStruct;
  date!: { year: 2001; month: 3; day:3 };

  @Input() dateData: any ;
  constructor(
    private calendar: NgbCalendar
  ) { 

    this.model=this.date;
      
  }

  ngOnInit(): void {
    
  }

  selectToday() {
		this.model = this.date;
	}

}
