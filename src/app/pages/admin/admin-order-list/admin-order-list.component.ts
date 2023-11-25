import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerDto } from 'src/app/commons/dto/customer';
import { OrderDto } from 'src/app/commons/dto/order';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ModalAdminUpdateOrderComponent } from '../modal/modal-admin-update-order/modal-admin-update-order.component';
import { ModalAdminPrintPaymentComponent } from '../modal/modal-admin-print-payment/modal-admin-print-payment.component';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent {

  customerId!: number;
  customerDto: CustomerDto = new CustomerDto();

  constructor(
    private modalService: NzModalService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.customerId = Number(url[url.length - 1]);

    this.getCustomerById();
    this.getOrderOfCustomer();
  }

  listOfDisplayData: OrderDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getCustomerById(): void {
    this.customerService.getCustomerById(this.customerId).subscribe(response => {
      this.customerDto = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  getOrderOfCustomer(): void {
    this.orderService.getOrdersOfCustomer(this.customerId).subscribe(response => {
      this.listOfDisplayData = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  onCreateOrder(): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn đặt món cho khách hàng #' + this.customerDto.fullName + '</b>',
      nzOnOk: () => this.router.navigate(['/admin/create-order', this.customerId])
    });
  }

  onDetailOrder(orderId: number): void {
    const modal = this.modalService.create({
      nzContent: ModalAdminPrintPaymentComponent,
      nzStyle: { top: '10px' },
      nzWidth: 850,
    });
    modal.componentInstance!.orderId = orderId;
  }

  showModalUpdateOrder(orderId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin đặt món',
      nzContent: ModalAdminUpdateOrderComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.orderId = orderId;
    modal.afterClose.subscribe(() => this.getOrderOfCustomer())
  }
}
