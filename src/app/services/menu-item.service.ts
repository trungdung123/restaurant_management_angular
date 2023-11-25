import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MenuItemListResponse, MenuItemRequest, MenuItemResponse } from '../commons/dto/menu-item';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {
    private baseURL = ROOT_API + "/menu-items";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createMenuItem(menuItemRequest: MenuItemRequest, files: NzUploadFile[]): Observable<MenuItemResponse> {
        let formData: FormData = new FormData();
        files.forEach((file: any) => {
            formData.append('files', file);
        })
        console.log(files)
        formData.append('data', new Blob([JSON.stringify(menuItemRequest)], { type: 'application/json' }));

        return this.httpClient.post<MenuItemResponse>(`${this.baseURL}`, formData);
    }

    getAllMenuItems(): Observable<MenuItemListResponse> {
        return this.httpClient.get<MenuItemListResponse>(`${this.baseURL}`);
    }

    getMenuItemByCategory(categoryId: number): Observable<MenuItemListResponse> {
        return this.httpClient.get<MenuItemListResponse>(`${this.baseURL}/category/${categoryId}`);
    }

    getMenuItemById(menuItemId: number): Observable<MenuItemResponse> {
        return this.httpClient.get<MenuItemResponse>(`${this.baseURL}/${menuItemId}`);
    }

    updateMenuItem(menUitemId: number, menuItemRequest: MenuItemRequest): Observable<MenuItemResponse> {
        return this.httpClient.put<MenuItemResponse>(`${this.baseURL}/${menUitemId}`, menuItemRequest);
    }

    deleteMenuItem(menuItemId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${menuItemId}`);
    }
}