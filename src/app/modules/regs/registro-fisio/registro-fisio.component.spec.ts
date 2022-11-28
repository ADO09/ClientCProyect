import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFisioComponent } from './registro-fisio.component';

describe('RegistroFisioComponent', () => {
  let component: RegistroFisioComponent;
  let fixture: ComponentFixture<RegistroFisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
