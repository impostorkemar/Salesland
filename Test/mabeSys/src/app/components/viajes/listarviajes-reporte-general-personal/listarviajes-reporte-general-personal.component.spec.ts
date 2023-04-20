import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarviajesReporteGeneralPersonalComponent } from './listarviajes-reporte-general-personal.component';

describe('ListarviajesReporteGeneralPersonalComponent', () => {
  let component: ListarviajesReporteGeneralPersonalComponent;
  let fixture: ComponentFixture<ListarviajesReporteGeneralPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarviajesReporteGeneralPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarviajesReporteGeneralPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
