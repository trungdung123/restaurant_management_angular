import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { CustomerListResponse, CustomerRequest, CustomerResponse } from '../commons/dto/customer';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private baseURL = ROOT_API + "/customers";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createCustomer(customerRequest: CustomerRequest): Observable<CustomerResponse> {
        return this.httpClient.post<CustomerResponse>(`${this.baseURL}`, customerRequest);
    }

    getAllCustomer(): Observable<CustomerListResponse> {
        return this.httpClient.get<CustomerListResponse>(`${this.baseURL}`);
    }

    getCustomerById(customerId: number): Observable<CustomerResponse> {
        return this.httpClient.get<CustomerResponse>(`${this.baseURL}/${customerId}`);
    }

    updateCustomer(customerId: number, customerRequest: CustomerRequest): Observable<CustomerResponse> {
        return this.httpClient.put<CustomerResponse>(`${this.baseURL}/${customerId}`, customerRequest);
    }

    deleteCustomer(customerId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${customerId}`);
    }

}
