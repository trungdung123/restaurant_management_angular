import { CategoryDto } from "./category";
import { BaseResponse } from "./response";

export class MenuItemDto {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    images!: Image[];
    categoryDto!: CategoryDto;
}

export class Image {
    id!: number;
    imageUrl!: string;
    title!: string;
    menuItem!: MenuItemDto;
}

export class MenuItemRequest {
    name!: string;
    description!: string;
    price!: number;
    categoryId!: number;
}

export class MenuItemResponse implements BaseResponse {
    message!: string;
    data!: MenuItemDto;
}

export class MenuItemListResponse implements BaseResponse {
    message!: string;
    data!: MenuItemDto[];
}