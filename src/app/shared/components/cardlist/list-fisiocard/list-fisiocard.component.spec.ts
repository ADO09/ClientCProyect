import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFisiocardComponent } from './list-fisiocard.component';

describe('ListFisiocardComponent', () => {
  let component: ListFisiocardComponent;
  let fixture: ComponentFixture<ListFisiocardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFisiocardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFisiocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
