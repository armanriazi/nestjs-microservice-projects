export declare enum BookStateType {
    RENTED = 0,
    QUEUE = 1,
    READY = 2
}
export declare class CreateOrderDto {
    bookname: string;
    bookstateType: BookStateType;
    userId: string;
    id: string;
    createdAt?: string;
    updatedAt?: string;
}
