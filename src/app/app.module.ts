import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NgZorroAntdModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { AdminCategoryListComponent } from './pages/admin/admin-category-list/admin-category-list.component';
import { AdminMenuItemListComponent } from './pages/admin/admin-menu-item-list/admin-menu-item-list.component';
import { AdminCustomerListComponent } from './pages/admin/admin-customer-list/admin-customer-list.component';
import { AdminOrderListComponent } from './pages/admin/admin-order-list/admin-order-list.component';
import { ModalAdminCreateCategoryComponent } from './pages/admin/modal/modal-admin-create-category/modal-admin-create-category.component';
import { ModalAdminUpdateCategoryComponent } from './pages/admin/modal/modal-admin-update-category/modal-admin-update-category.component';
import { ModalAdminCreateCustomerComponent } from './pages/admin/modal/modal-admin-create-customer/modal-admin-create-customer.component';
import { ModalAdminUpdateCustomerComponent } from './pages/admin/modal/modal-admin-update-customer/modal-admin-update-customer.component';
import { ModalAdminCreateMenuItemComponent } from './pages/admin/modal/modal-admin-create-menu-item/modal-admin-create-menu-item.component';
import { ModalAdminUpdateMenuItemComponent } from './pages/admin/modal/modal-admin-update-menu-item/modal-admin-update-menu-item.component';
import { AdminCreateOrderComponent } from './pages/admin/admin-create-order/admin-create-order.component';
import { ModalAdminUpdateOrderComponent } from './pages/admin/modal/modal-admin-update-order/modal-admin-update-order.component';
import { ModalAdminPrintPaymentComponent } from './pages/admin/modal/modal-admin-print-payment/modal-admin-print-payment.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminCategoryListComponent,
    AdminMenuItemListComponent,
    AdminCustomerListComponent,
    AdminOrderListComponent,
    ModalAdminCreateCategoryComponent,
    ModalAdminUpdateCategoryComponent,
    ModalAdminCreateCustomerComponent,
    ModalAdminUpdateCustomerComponent,
    ModalAdminCreateMenuItemComponent,
    ModalAdminUpdateMenuItemComponent,
    AdminCreateOrderComponent,
    ModalAdminUpdateOrderComponent,
    ModalAdminPrintPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
