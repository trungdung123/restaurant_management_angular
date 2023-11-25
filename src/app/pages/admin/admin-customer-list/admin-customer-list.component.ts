import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CustomerDto } from 'src/app/commons/dto/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalAdminCreateCustomerComponent } from '../modal/modal-admin-create-customer/modal-admin-create-customer.component';
import { ModalAdminUpdateCustomerComponent } from '../modal/modal-admin-update-customer/modal-admin-update-customer.component';

@Component({
  selector: 'app-admin-customer-list',
  templateUrl: './admin-customer-list.component.html',
  styleUrls: ['./admin-customer-list.component.scss']
})
export class AdminCustomerListComponent {
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  listOfDisplayData: CustomerDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllCustomer(): void {
    this.customerService.getAllCustomer().subscribe(response => {
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

  showModalCreateCustomer(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ModalAdminCreateCustomerComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllCustomer())
  }

  showModalUpdateCustomer(customerId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin khách hàng',
      nzContent: ModalAdminUpdateCustomerComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.customerId = customerId;
    modal.afterClose.subscribe(() => this.getAllCustomer())
  }

  onDeleteCustomer(customerId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu khách hàng #' + customerId + '?</b>',
      nzOnOk: () => this.customerService.deleteCustomer(customerId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu khách hàng thành công!!'
        );
        this.getAllCustomer();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }

  onCreateOrder(customerId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem lịch sử đặt món của khách hàng #' + customerId + '?</b>',
      nzOnOk: () => this.router.navigate(['/admin/orders/customer', customerId])
    });
  }
}
