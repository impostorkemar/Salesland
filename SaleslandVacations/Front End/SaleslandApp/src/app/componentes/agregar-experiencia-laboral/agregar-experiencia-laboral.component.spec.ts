import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarExperienciaLaboralComponent } from './agregar-experiencia-laboral.component';

describe('AgregarExperienciaLaboralComponent', () => {
  let component: AgregarExperienciaLaboralComponent;
  let fixture: ComponentFixture<AgregarExperienciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarExperienciaLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarExperienciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
