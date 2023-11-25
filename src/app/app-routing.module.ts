import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminCategoryListComponent } from './pages/admin/admin-category-list/admin-category-list.component';
import { AdminCreateOrderComponent } from './pages/admin/admin-create-order/admin-create-order.component';
import { AdminCustomerListComponent } from './pages/admin/admin-customer-list/admin-customer-list.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminMenuItemListComponent } from './pages/admin/admin-menu-item-list/admin-menu-item-list.component';
import { AdminOrderListComponent } from './pages/admin/admin-order-list/admin-order-list.component';
import { AuthGuard } from './services/guard/auth.guard';

const adminRoutes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/home', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/categories', component: AdminCategoryListComponent, canActivate: [AuthGuard] },
  { path: 'admin/menu-items', component: AdminMenuItemListComponent, canActivate: [AuthGuard] },
  { path: 'admin/customers', component: AdminCustomerListComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders/customer/:customerId', component: AdminOrderListComponent, canActivate: [AuthGuard] },
  { path: 'admin/create-order/:customerId', component: AdminCreateOrderComponent, canActivate: [AuthGuard] },
]

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  ...adminRoutes,
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
