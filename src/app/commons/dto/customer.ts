import { BaseResponse } from "./response";

export class CustomerRequest {
    fullName!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
}

export class CustomerDto {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
}

export class CustomerResponse implements BaseResponse {
    message!: string;
    data!: CustomerDto;
}

export class CustomerListResponse implements BaseResponse {
    message!: string;
    data!: CustomerDto[];
}