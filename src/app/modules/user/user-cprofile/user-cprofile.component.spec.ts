import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCprofileComponent } from './user-cprofile.component';

describe('UserCprofileComponent', () => {
  let component: UserCprofileComponent;
  let fixture: ComponentFixture<UserCprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
