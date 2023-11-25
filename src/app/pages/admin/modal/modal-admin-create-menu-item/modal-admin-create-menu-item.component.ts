import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CategoryDto } from 'src/app/commons/dto/category';
import { MenuItemRequest } from 'src/app/commons/dto/menu-item';
import { CategoryService } from 'src/app/services/category.service';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-modal-admin-create-menu-item',
  templateUrl: './modal-admin-create-menu-item.component.html',
  styleUrls: ['./modal-admin-create-menu-item.component.scss']
})
export class ModalAdminCreateMenuItemComponent {

  categories: CategoryDto[] = [];

  validateForm!: UntypedFormGroup;
  menuItemRequest: MenuItemRequest = new MenuItemRequest();

  files: NzUploadFile[] = [];
  fileOriginals: File[] = []

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private menuItemService: MenuItemService,    
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
    this.getAllCategory();
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(response => {
      this.categories = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  createMenuItem(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.menuItemRequest = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
        price: this.validateForm.value.price,
        categoryId: this.validateForm.value.categoryId,
      }
    
      this.menuItemService.createMenuItem(this.menuItemRequest, this.files).subscribe(response => {
        this.destroyModal();
        this.notification.create(
          'success',
          'Thôn báo',
          'Thêm mới thực đơn thành công'
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

  beforeUpload = (file: NzUploadFile): boolean => {
    this.files = this.files.concat(file);
    return false;
  };

}
