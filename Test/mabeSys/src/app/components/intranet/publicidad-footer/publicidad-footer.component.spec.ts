import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadFooterComponent } from './publicidad-footer.component';

describe('PublicidadFooterComponent', () => {
  let component: PublicidadFooterComponent;
  let fixture: ComponentFixture<PublicidadFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicidadFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicidadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
