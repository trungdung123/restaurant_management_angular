import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateCustomerComponent } from './modal-admin-create-customer.component';

describe('ModalAdminCreateCustomerComponent', () => {
  let component: ModalAdminCreateCustomerComponent;
  let fixture: ComponentFixture<ModalAdminCreateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdminCreateCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdminCreateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
