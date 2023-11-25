import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateCustomerComponent } from './modal-admin-update-customer.component';

describe('ModalAdminUpdateCustomerComponent', () => {
  let component: ModalAdminUpdateCustomerComponent;
  let fixture: ComponentFixture<ModalAdminUpdateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminUpdateCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminUpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
