import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceGListComponent } from './balance-glist.component';

describe('BalanceGListComponent', () => {
  let component: BalanceGListComponent;
  let fixture: ComponentFixture<BalanceGListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceGListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceGListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
