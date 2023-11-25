import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderDto } from 'src/app/commons/dto/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-modal-admin-print-payment',
  templateUrl: './modal-admin-print-payment.component.html',
  styleUrls: ['./modal-admin-print-payment.component.scss']
})
export class ModalAdminPrintPaymentComponent {
  @Input() orderId!: number;

  orderDto: OrderDto = new OrderDto();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private orderService: OrderService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById(): void {
    this.orderService.getOrderId(this.orderId).subscribe(response => {
      this.orderDto = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  destroyModal(): void {
    this.modal.close();
  }

  onPrint(): void {
    let data = this.modal.getElement()
    if (data != null) {
      let unwantedElement = data.querySelector('#no-print');
      console.log(unwantedElement)
      if (unwantedElement != null) {
        unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
      }
      window.print();
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
