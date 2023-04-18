import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCentrosCostosComponent } from './listar-centros-costos.component';

describe('ListarCentrosCostosComponent', () => {
  let component: ListarCentrosCostosComponent;
  let fixture: ComponentFixture<ListarCentrosCostosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCentrosCostosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCentrosCostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
