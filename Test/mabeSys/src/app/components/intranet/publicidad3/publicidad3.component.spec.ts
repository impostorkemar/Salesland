import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicidad3Component } from './publicidad3.component';

describe('Publicidad3Component', () => {
  let component: Publicidad3Component;
  let fixture: ComponentFixture<Publicidad3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Publicidad3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicidad3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
