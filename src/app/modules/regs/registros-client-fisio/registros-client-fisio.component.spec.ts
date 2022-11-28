import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosClientFisioComponent } from './registros-client-fisio.component';

describe('RegistrosClientFisioComponent', () => {
  let component: RegistrosClientFisioComponent;
  let fixture: ComponentFixture<RegistrosClientFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosClientFisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosClientFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
