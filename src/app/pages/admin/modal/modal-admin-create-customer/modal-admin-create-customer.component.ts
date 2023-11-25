import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerRequest } from 'src/app/commons/dto/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-modal-admin-create-customer',
  templateUrl: './modal-admin-create-customer.component.html',
  styleUrls: ['./modal-admin-create-customer.component.scss']
})
export class ModalAdminCreateCustomerComponent {

  validateForm!: UntypedFormGroup;
  customerRequest: CustomerRequest = new CustomerRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });
  }

  createCustomer(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.customerRequest = {
        fullName: this.validateForm.value.fullName,
        phoneNumber: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.email,
        address: this.validateForm.value.address
      }

      this.customerService.createCustomer(this.customerRequest).subscribe(response => {
        this.destroyModal();
        this.notification.create(
          'success',
          'Thôn báo',
          'Thêm mới khách hàng thành công'
        );
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  destroyModal(): void {
    this.modal.close();
  }

}
