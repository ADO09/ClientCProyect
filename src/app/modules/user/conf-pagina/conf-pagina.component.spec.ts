import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPaginaComponent } from './conf-pagina.component';

describe('ConfPaginaComponent', () => {
  let component: ConfPaginaComponent;
  let fixture: ComponentFixture<ConfPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
