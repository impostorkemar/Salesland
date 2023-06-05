import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicidad6Component } from './publicidad6.component';

describe('Publicidad6Component', () => {
  let component: Publicidad6Component;
  let fixture: ComponentFixture<Publicidad6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Publicidad6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicidad6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
