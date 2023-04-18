import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarVentaComponent } from './ingresar-venta.component';

describe('IngresarVentaComponent', () => {
  let component: IngresarVentaComponent;
  let fixture: ComponentFixture<IngresarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
