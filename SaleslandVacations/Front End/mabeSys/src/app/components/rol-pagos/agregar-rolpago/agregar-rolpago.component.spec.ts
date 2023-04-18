import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRolpagoComponent } from './agregar-rolpago.component';

describe('AgregarRolpagoComponent', () => {
  let component: AgregarRolpagoComponent;
  let fixture: ComponentFixture<AgregarRolpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRolpagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRolpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
