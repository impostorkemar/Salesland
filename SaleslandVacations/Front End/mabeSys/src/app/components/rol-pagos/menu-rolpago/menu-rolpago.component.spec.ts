import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRolpagoComponent } from './menu-rolpago.component';

describe('MenuRolpagoComponent', () => {
  let component: MenuRolpagoComponent;
  let fixture: ComponentFixture<MenuRolpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRolpagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRolpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
