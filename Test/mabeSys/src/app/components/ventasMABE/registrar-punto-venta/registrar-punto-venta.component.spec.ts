import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPuntoVentaComponent } from './registrar-punto-venta.component';

describe('RegistrarPuntoVentaComponent', () => {
  let component: RegistrarPuntoVentaComponent;
  let fixture: ComponentFixture<RegistrarPuntoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPuntoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPuntoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
