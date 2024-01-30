export declare enum BookStateType {
    RENTED = 0,
    QUEUE = 1,
    READY = 2
}
export declare class CreateOrderDto {
    bookname: string;
    user_id: string;
    bookstateType: BookStateType;
}
//# sourceMappingURL=CreateOrder.dto.d.ts.map