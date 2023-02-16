import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPersonalComponent } from './login-personal.component';

describe('LoginPersonalComponent', () => {
  let component: LoginPersonalComponent;
  let fixture: ComponentFixture<LoginPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
