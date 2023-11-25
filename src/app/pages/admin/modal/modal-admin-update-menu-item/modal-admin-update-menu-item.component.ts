import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryDto } from 'src/app/commons/dto/category';
import { MenuItemRequest } from 'src/app/commons/dto/menu-item';
import { CategoryService } from 'src/app/services/category.service';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-modal-admin-update-menu-item',
  templateUrl: './modal-admin-update-menu-item.component.html',
  styleUrls: ['./modal-admin-update-menu-item.component.scss']
})
export class ModalAdminUpdateMenuItemComponent {
  @Input() menuItemId!: number;

  categories: CategoryDto[] = [];

  validateForm!: UntypedFormGroup;
  menuItemRequest: MenuItemRequest = new MenuItemRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private menuItemService: MenuItemService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
    this.getMenuItemById();
    this.getAllCategory();
  }

  getMenuItemById(): void {
    this.menuItemService.getMenuItemById(this.menuItemId).subscribe(response => {
      let data = response.data;

      this.validateForm = this.fb.group({
        name: [data.name, [Validators.required]],
        description: [data.description, [Validators.required]],
        price: [data.price, [Validators.required]],
        categoryId: [data.categoryDto.id, [Validators.required]],
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
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

  updateMenuItem(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.menuItemRequest = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
        price: this.validateForm.value.price,
        categoryId: this.validateForm.value.categoryId,
      }

      this.menuItemService.updateMenuItem(this.menuItemId, this.menuItemRequest).subscribe(response => {
        this.destroyModal();

        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật thông tin thực đơn thành công'
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
