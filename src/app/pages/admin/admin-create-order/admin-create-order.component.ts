import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryDto } from 'src/app/commons/dto/category';
import { CustomerDto } from 'src/app/commons/dto/customer';
import { MenuItemDto } from 'src/app/commons/dto/menu-item';
import { OrderDto, OrderItemDto, OrderItemRequest, OrderRequest } from 'src/app/commons/dto/order';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-create-order',
  templateUrl: './admin-create-order.component.html',
  styleUrls: ['./admin-create-order.component.scss']
})
export class AdminCreateOrderComponent {

  validateForm!: UntypedFormGroup;

  customerId!: number;
  customerDto: CustomerDto = new CustomerDto();

  categories: CategoryDto[] = [];
  menuItems: MenuItemDto[] = [];
  orderItems: OrderItemDto[] = [];

  fixPrice: string = "Đơn giá";

  orderItemsRequest: OrderItemRequest[] = []
  orderRequest: OrderRequest = new OrderRequest();

  constructor(
    private modalService: NzModalService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private categoryService: CategoryService,
    private fb: UntypedFormBuilder,
    private menuItemService: MenuItemService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.customerId = Number(url[url.length - 1]);

    this.validateForm = this.fb.group({
      categoryId: [null],
      menuItemId: [null, [Validators.required]],
      quantity: [1, [Validators.required]]
    });

    this.getCustomerById();
    this.getAllCategory();
    this.getAllMenuItem();
  }

  listOfDisplayData: OrderDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(response => {
      this.categories = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  getAllMenuItem(): void {
    this.menuItemService.getAllMenuItems().subscribe(response => {
      this.menuItems = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

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

  onChangeCategory(categoryId: number): void {
    this.menuItemService.getMenuItemByCategory(categoryId).subscribe(data => {
      this.menuItems = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  onChangeMenuItem(menuItemId: number): void {
    let indexExist = this.menuItems.findIndex(e => e.id == menuItemId);
    let price = this.menuItems[indexExist].price;
    this.fixPrice = price.toLocaleString().replaceAll(",", ".") + ' đ';
  }

  addItem(): void {
    if (this.validateForm.valid) {
      let indexExist = this.orderItems.findIndex(e => e.menuItemDto.id == this.validateForm.value.menuItemId);

      if (indexExist == -1) {
        let indexItem: number = this.menuItems.findIndex(e => e.id == this.validateForm.value.menuItemId);
        let item: MenuItemDto = this.menuItems[indexItem];
        let orderItemData: OrderItemDto = {
          id: -1,
          menuItemDto: item,
          quantity: this.validateForm.value.quantity,
        }
        this.orderItems.push(orderItemData)
      } else {
        this.orderItems[indexExist].quantity += this.validateForm.value.quantity
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  removeMenuItem(menuItemId: number): void {
    let index = this.orderItems.findIndex(e => e.menuItemDto.id == menuItemId)
    this.orderItems.splice(index, 1);
  }

  saveInfo(): void {
    if (this.validateForm.valid) {
      this.orderItems.forEach(e =>
        this.orderItemsRequest.push({
          menuItemId: e.menuItemDto.id,
          quantity: e.quantity
        }))
      this.orderRequest = {
        customerId: this.customerId,
        orderItemRequests: this.orderItemsRequest,
        orderDate: new Date(),
        paymentMethod: 'Chưa thanh toán',
        note: "none"
      }
      this.orderService.createOrder(this.orderRequest).subscribe(data => {
        this.router.navigate(['/admin/orders/customer', this.customerId])
        this.notification.create(
          'info',
          'Lưu dữ liệu',
          'Dặt món thánh công'
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
}
