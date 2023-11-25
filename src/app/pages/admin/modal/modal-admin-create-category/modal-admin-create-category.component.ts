import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryRequest } from 'src/app/commons/dto/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-modal-admin-create-category',
  templateUrl: './modal-admin-create-category.component.html',
  styleUrls: ['./modal-admin-create-category.component.scss']
})
export class ModalAdminCreateCategoryComponent {

  validateForm!: UntypedFormGroup;
  categoryRequest: CategoryRequest = new CategoryRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private categoryService: CategoryService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
  }

  createCategory(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.categoryRequest = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }

      this.categoryService.createCategory(this.categoryRequest).subscribe(response => {
        this.destroyModal();
        this.notification.create(
          'success',
          'Thôn báo',
          'Thêm mới danh mục thành công'
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
