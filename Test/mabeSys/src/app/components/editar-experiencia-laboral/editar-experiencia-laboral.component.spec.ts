import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExperienciaLaboralComponent } from './editar-experiencia-laboral.component';

describe('EditarExperienciaLaboralComponent', () => {
  let component: EditarExperienciaLaboralComponent;
  let fixture: ComponentFixture<EditarExperienciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarExperienciaLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarExperienciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
