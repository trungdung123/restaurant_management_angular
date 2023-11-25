import { MenuItemDto } from "./menu-item";
import { BaseResponse } from "./response";

export class CategoryDto {
    id!: number;
    name!: string;
    description!: string;
    menuItemsDto!: MenuItemDto;
}

export class CategoryRequest {
    name!: string;
    description!: string;
}

export class CategoryResponse implements BaseResponse {
    message!: string;
    data!: CategoryDto;
}

export class CategoryListResponse implements BaseResponse {
    message!: string;
    data!: CategoryDto[];
}