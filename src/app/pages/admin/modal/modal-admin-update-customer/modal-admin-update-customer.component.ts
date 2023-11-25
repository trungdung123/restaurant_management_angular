import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerRequest } from 'src/app/commons/dto/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-modal-admin-update-customer',
  templateUrl: './modal-admin-update-customer.component.html',
  styleUrls: ['./modal-admin-update-customer.component.scss']
})
export class ModalAdminUpdateCustomerComponent {
  @Input() customerId!: number;

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
    this.getCustomerById();
  }

  getCustomerById(): void {
    this.customerService.getCustomerById(this.customerId).subscribe(response => {
      let data = response.data;

      this.validateForm = this.fb.group({
        fullName: [data.fullName, [Validators.required]],
        phoneNumber: [data.phoneNumber, [Validators.required]],
        email: [data.email, [Validators.required]],
        address: [data.address, [Validators.required]],
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  updateCustomer(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.customerRequest = {
        fullName: this.validateForm.value.fullName,
        phoneNumber: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.email,
        address: this.validateForm.value.address
      }

      this.customerService.updateCustomer(this.customerId, this.customerRequest).subscribe(response => {
        this.destroyModal();

        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật thông tin khách hàng thành công'
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
