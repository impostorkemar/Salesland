import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicidad4Component } from './publicidad4.component';

describe('Publicidad4Component', () => {
  let component: Publicidad4Component;
  let fixture: ComponentFixture<Publicidad4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Publicidad4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicidad4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
