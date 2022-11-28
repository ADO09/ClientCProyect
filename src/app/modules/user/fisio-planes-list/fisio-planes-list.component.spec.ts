import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisioPlanesListComponent } from './fisio-planes-list.component';

describe('FisioPlanesListComponent', () => {
  let component: FisioPlanesListComponent;
  let fixture: ComponentFixture<FisioPlanesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisioPlanesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisioPlanesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
