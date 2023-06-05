import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentoInternoComponent } from './reglamento-interno.component';

describe('ReglamentoInternoComponent', () => {
  let component: ReglamentoInternoComponent;
  let fixture: ComponentFixture<ReglamentoInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReglamentoInternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglamentoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
