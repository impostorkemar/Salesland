import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCargoComponent } from './agregar-cargo.component';

describe('AgregarCargoComponent', () => {
  let component: AgregarCargoComponent;
  let fixture: ComponentFixture<AgregarCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCargoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
