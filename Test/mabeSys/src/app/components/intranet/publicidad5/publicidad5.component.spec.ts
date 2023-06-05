import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicidad5Component } from './publicidad5.component';

describe('Publicidad5Component', () => {
  let component: Publicidad5Component;
  let fixture: ComponentFixture<Publicidad5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Publicidad5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicidad5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
