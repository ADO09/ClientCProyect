import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFisioComponent } from './configuracion-fisio.component';

describe('ConfiguracionFisioComponent', () => {
  let component: ConfiguracionFisioComponent;
  let fixture: ComponentFixture<ConfiguracionFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionFisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
