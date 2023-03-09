import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReporteGeneralSupervisorComponent } from './listar-reporte-general-supervisor.component';

describe('ListarReporteGeneralSupervisorComponent', () => {
  let component: ListarReporteGeneralSupervisorComponent;
  let fixture: ComponentFixture<ListarReporteGeneralSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarReporteGeneralSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarReporteGeneralSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
