export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}

export class CreateOrderDto {
  bookname: string;
  bookstateType: BookStateType;
  userId: string;
}
