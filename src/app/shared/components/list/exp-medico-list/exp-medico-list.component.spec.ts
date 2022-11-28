import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMedicoListComponent } from './exp-medico-list.component';

describe('ExpMedicoListComponent', () => {
  let component: ExpMedicoListComponent;
  let fixture: ComponentFixture<ExpMedicoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMedicoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpMedicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
