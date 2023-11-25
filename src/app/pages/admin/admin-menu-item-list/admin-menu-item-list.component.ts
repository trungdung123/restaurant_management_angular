import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MenuItemDto } from 'src/app/commons/dto/menu-item';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { ModalAdminCreateMenuItemComponent } from '../modal/modal-admin-create-menu-item/modal-admin-create-menu-item.component';
import { ModalAdminUpdateMenuItemComponent } from '../modal/modal-admin-update-menu-item/modal-admin-update-menu-item.component';

@Component({
  selector: 'app-admin-menu-item-list',
  templateUrl: './admin-menu-item-list.component.html',
  styleUrls: ['./admin-menu-item-list.component.scss']
})
export class AdminMenuItemListComponent {
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private menuItemService: MenuItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMenuItem();
  }

  listOfDisplayData: MenuItemDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllMenuItem(): void {
    this.menuItemService.getAllMenuItems().subscribe(response => {
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

  onCreateMenuItem(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới thực đơn',
      nzContent: ModalAdminCreateMenuItemComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllMenuItem())
  }

  showModalUpdateMenuItem(menuItemId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin Thực đơn',
      nzContent: ModalAdminUpdateMenuItemComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.menuItemId = menuItemId;
    modal.afterClose.subscribe(() => this.getAllMenuItem())
  }

  onDeleteMenuItem(menuItemId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu thực đơn #' + menuItemId + '?</b>',
      nzOnOk: () => this.menuItemService.deleteMenuItem(menuItemId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu thực đơn thành công!!'
        );
        this.getAllMenuItem();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }
}
