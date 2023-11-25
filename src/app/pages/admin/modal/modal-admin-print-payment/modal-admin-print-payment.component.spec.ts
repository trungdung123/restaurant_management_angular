import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminPrintPaymentComponent } from './modal-admin-print-payment.component';

describe('ModalAdminPrintPaymentComponent', () => {
  let component: ModalAdminPrintPaymentComponent;
  let fixture: ComponentFixture<ModalAdminPrintPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminPrintPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminPrintPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
