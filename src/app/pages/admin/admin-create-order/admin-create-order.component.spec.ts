import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateOrderComponent } from './admin-create-order.component';

describe('AdminCreateOrderComponent', () => {
  let component: AdminCreateOrderComponent;
  let fixture: ComponentFixture<AdminCreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
