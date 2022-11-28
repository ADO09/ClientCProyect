import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisiosListComponent } from './fisios-list.component';

describe('FisiosListComponent', () => {
  let component: FisiosListComponent;
  let fixture: ComponentFixture<FisiosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisiosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisiosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
