import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCentroCostoComponent } from './agregar-centro-costo.component';

describe('AgregarCentroCostoComponent', () => {
  let component: AgregarCentroCostoComponent;
  let fixture: ComponentFixture<AgregarCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCentroCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
