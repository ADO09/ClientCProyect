import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientListComponent } from './list-client-list.component';

describe('ListClientListComponent', () => {
  let component: ListClientListComponent;
  let fixture: ComponentFixture<ListClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
