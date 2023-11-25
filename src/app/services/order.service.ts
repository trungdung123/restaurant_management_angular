import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { OrderListResponse, OrderRequest, OrderResponse } from '../commons/dto/order';
import { BaseResponse } from '../commons/dto/response';
import { OrderStatus } from './../commons/dto/order';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseURL = ROOT_API + "/orders";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
        return this.httpClient.post<OrderResponse>(`${this.baseURL}`, orderRequest);
    }

    updateOrder(orderId: number, orderStatus: number, paymentMethod: string): Observable<OrderResponse> {
        let formData: FormData = new FormData();
        formData.append('paymentMethod', paymentMethod);
        return this.httpClient.patch<OrderResponse>(`${this.baseURL}/${orderId}/update-status/${orderStatus}`, formData);
    }

    getAllOrder(): Observable<OrderListResponse> {
        return this.httpClient.get<OrderListResponse>(`${this.baseURL}`);
    }

    getOrdersOfCustomer(customerId: number): Observable<OrderListResponse> {
        return this.httpClient.get<OrderListResponse>(`${this.baseURL}/customer/${customerId}`);
    }

    getOrderId(orderId: number): Observable<OrderResponse> {
        return this.httpClient.get<OrderResponse>(`${this.baseURL}/${orderId}`);
    }

    deleteOrder(orderId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${orderId}`);
    }
}
