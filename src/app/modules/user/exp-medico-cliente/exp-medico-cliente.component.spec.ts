import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMedicoClienteComponent } from './exp-medico-cliente.component';

describe('ExpMedicoClienteComponent', () => {
  let component: ExpMedicoClienteComponent;
  let fixture: ComponentFixture<ExpMedicoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMedicoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpMedicoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
