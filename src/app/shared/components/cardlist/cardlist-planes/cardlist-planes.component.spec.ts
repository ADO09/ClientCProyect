import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistPlanesComponent } from './cardlist-planes.component';

describe('CardlistPlanesComponent', () => {
  let component: CardlistPlanesComponent;
  let fixture: ComponentFixture<CardlistPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardlistPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
