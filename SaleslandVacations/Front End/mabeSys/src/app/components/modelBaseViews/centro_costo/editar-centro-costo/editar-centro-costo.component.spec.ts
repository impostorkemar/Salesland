import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCentroCostoComponent } from './editar-centro-costo.component';

describe('EditarCentroCostoComponent', () => {
  let component: EditarCentroCostoComponent;
  let fixture: ComponentFixture<EditarCentroCostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCentroCostoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCentroCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
