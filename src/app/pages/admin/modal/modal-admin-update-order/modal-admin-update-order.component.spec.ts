import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateOrderComponent } from './modal-admin-update-order.component';

describe('ModalAdminUpdateOrderComponent', () => {
  let component: ModalAdminUpdateOrderComponent;
  let fixture: ComponentFixture<ModalAdminUpdateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUpdateOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
