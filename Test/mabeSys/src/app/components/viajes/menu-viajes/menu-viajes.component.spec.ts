import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViajesComponent } from './menu-viajes.component';

describe('MenuViajesComponent', () => {
  let component: MenuViajesComponent;
  let fixture: ComponentFixture<MenuViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuViajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
