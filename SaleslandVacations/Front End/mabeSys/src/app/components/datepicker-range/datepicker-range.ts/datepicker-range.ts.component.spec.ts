import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRangeTsComponent } from './datepicker-range.ts.component';

describe('DatepickerRangeTsComponent', () => {
  let component: DatepickerRangeTsComponent;
  let fixture: ComponentFixture<DatepickerRangeTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepickerRangeTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerRangeTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
