import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVacacionComponent } from './agregar-vacacion.component';

describe('AgregarVacacionComponent', () => {
  let component: AgregarVacacionComponent;
  let fixture: ComponentFixture<AgregarVacacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarVacacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarVacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
