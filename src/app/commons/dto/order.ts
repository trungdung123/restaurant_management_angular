import { CustomerDto } from "./customer";
import { MenuItemDto } from "./menu-item";
import { BaseResponse } from "./response";

export enum OrderStatus {
    DONE,
    PENDING
}

export class OrderDto {
    id!: number;
    customerDto!: CustomerDto;
    orderItemsDto!: OrderItemDto[];
    orderDate!: Date;
    paymentMethod!: string;
    totalAmount!: number;
    note!: string;
    status!: OrderStatus;
}

export class OrderItemDto {
    id!: number;
    menuItemDto!: MenuItemDto;
    quantity!: number;
}

export class OrderRequest {
    customerId!: number;
    orderItemRequests!: OrderItemRequest[];
    orderDate!: Date;
    paymentMethod!: string;
    note!: string;
}

export class OrderItemRequest {
    menuItemId!: number;
    quantity!: number;
}

export class OrderResponse implements BaseResponse {
    message!: string;
    data!: OrderDto;
}

export class OrderListResponse implements BaseResponse {
    message!: string;
    data!: OrderDto[];
}