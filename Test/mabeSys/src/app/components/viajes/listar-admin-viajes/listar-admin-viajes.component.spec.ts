import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdminViajesComponent } from './listar-admin-viajes.component';

describe('ListarAdminViajesComponent', () => {
  let component: ListarAdminViajesComponent;
  let fixture: ComponentFixture<ListarAdminViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAdminViajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAdminViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
