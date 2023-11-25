import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { CategoryListResponse, CategoryRequest, CategoryResponse } from '../commons/dto/category';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private baseURL = ROOT_API + "/categories";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createCategory(categoryRequest: CategoryRequest): Observable<CategoryResponse> {
        return this.httpClient.post<CategoryResponse>(`${this.baseURL}`, categoryRequest);
    }

    getAllCategory(): Observable<CategoryListResponse> {
        return this.httpClient.get<CategoryListResponse>(`${this.baseURL}`);
    }

    getCategoryById(categoryId: number): Observable<CategoryResponse> {
        return this.httpClient.get<CategoryResponse>(`${this.baseURL}/${categoryId}`);
    }

    updateCategory(categoryId: number, categoryRequest: CategoryRequest): Observable<CategoryResponse> {
        return this.httpClient.put<CategoryResponse>(`${this.baseURL}/${categoryId}`, categoryRequest);
    }

    deleteCategory(categoryId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${categoryId}`);
    }

}
