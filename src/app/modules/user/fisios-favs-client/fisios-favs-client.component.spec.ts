import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisiosFavsClientComponent } from './fisios-favs-client.component';

describe('FisiosFavsClientComponent', () => {
  let component: FisiosFavsClientComponent;
  let fixture: ComponentFixture<FisiosFavsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisiosFavsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FisiosFavsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
