import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReporteGeneralPersonalComponent } from './listar-reporte-general-personal.component';

describe('ListarReporteGeneralPersonalComponent', () => {
  let component: ListarReporteGeneralPersonalComponent;
  let fixture: ComponentFixture<ListarReporteGeneralPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarReporteGeneralPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarReporteGeneralPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
