import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisioCitasPendientesListPrincFisioComponent } from './fisio-citas-pendientes-list-princ-fisio.component';

describe('FisioCitasPendientesListPrincFisioComponent', () => {
  let component: FisioCitasPendientesListPrincFisioComponent;
  let fixture: ComponentFixture<FisioCitasPendientesListPrincFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisioCitasPendientesListPrincFisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisioCitasPendientesListPrincFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
