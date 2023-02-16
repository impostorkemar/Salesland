import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExperienciasLaboralesComponent } from './listar-experiencias-laborales.component';

describe('ListarExperienciasLaboralesComponent', () => {
  let component: ListarExperienciasLaboralesComponent;
  let fixture: ComponentFixture<ListarExperienciasLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarExperienciasLaboralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarExperienciasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
