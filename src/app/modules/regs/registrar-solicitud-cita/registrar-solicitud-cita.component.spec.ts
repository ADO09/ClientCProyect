import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSolicitudCitaComponent } from './registrar-solicitud-cita.component';

describe('RegistrarSolicitudCitaComponent', () => {
  let component: RegistrarSolicitudCitaComponent;
  let fixture: ComponentFixture<RegistrarSolicitudCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSolicitudCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSolicitudCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
