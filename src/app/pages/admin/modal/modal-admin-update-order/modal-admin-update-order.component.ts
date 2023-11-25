import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderService } from 'src/app/services/order.service';
import { OrderDto, OrderStatus } from './../../../../commons/dto/order';

@Component({
  selector: 'app-modal-admin-update-order',
  templateUrl: './modal-admin-update-order.component.html',
  styleUrls: ['./modal-admin-update-order.component.scss']
})
export class ModalAdminUpdateOrderComponent {
  @Input() orderId!: number

  validateForm!: UntypedFormGroup;
  orderStatus: OrderStatus = OrderStatus.PENDING;
  paymentMethod: string = "Chưa thanh toán";

  orderDto: OrderDto = new OrderDto();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private orderService: OrderService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null],
      phoneNumber: [null],
      paymentMethod: [null, [Validators.required]],
      orderStatus: [null, [Validators.required]]
    });
    this.getOrderById();
  }

  getOrderById(): void {
    this.orderService.getOrderId(this.orderId).subscribe(response => {
      this.orderDto = response.data;

      this.validateForm = this.fb.group({
        fullName: [this.orderDto.customerDto.fullName],
        phoneNumber: [this.orderDto.customerDto.phoneNumber],
        paymentMethod: [null, [Validators.required]],
        orderStatus: [null, [Validators.required]]
      });

    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  updateOrder(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.paymentMethod = this.validateForm.value.paymentMethod
      this.orderStatus = Number(this.validateForm.value.orderStatus)

      this.orderService.updateOrder(this.orderId, Number(this.validateForm.value.orderStatus), this.paymentMethod).subscribe(response => {
        this.destroyModal();

        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật thông tin đặt món thành công'
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
