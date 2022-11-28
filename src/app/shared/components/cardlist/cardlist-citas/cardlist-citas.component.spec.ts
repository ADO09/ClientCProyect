import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistCitasComponent } from './cardlist-citas.component';

describe('CardlistCitasComponent', () => {
  let component: CardlistCitasComponent;
  let fixture: ComponentFixture<CardlistCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistCitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardlistCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
