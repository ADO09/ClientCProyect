import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFProfileComponent } from './user-fprofile.component';

describe('UserFProfileComponent', () => {
  let component: UserFProfileComponent;
  let fixture: ComponentFixture<UserFProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
