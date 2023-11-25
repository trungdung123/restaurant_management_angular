import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryDto } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';
import { ModalAdminCreateCategoryComponent } from '../modal/modal-admin-create-category/modal-admin-create-category.component';
import { ModalAdminUpdateCategoryComponent } from '../modal/modal-admin-update-category/modal-admin-update-category.component';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss']
})
export class AdminCategoryListComponent {
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  listOfDisplayData: CategoryDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(response => {
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

  showModalCreateCategory(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới danh mục',
      nzContent: ModalAdminCreateCategoryComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllCategory())
  }

  showModalUpdateCategory(categoryId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin danh mục',
      nzContent: ModalAdminUpdateCategoryComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.categoryId = categoryId;
    modal.afterClose.subscribe(() => this.getAllCategory())
  }

  onDeleteCategory(categoryId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu danh mục #' + categoryId + '?</b>',
      nzOnOk: () => this.categoryService.deleteCategory(categoryId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu danh mục thành công!!'
        );
        this.getAllCategory();
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
