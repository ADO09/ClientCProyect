import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFisioComponent } from './gestion-fisio.component';

describe('GestionFisioComponent', () => {
  let component: GestionFisioComponent;
  let fixture: ComponentFixture<GestionFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
