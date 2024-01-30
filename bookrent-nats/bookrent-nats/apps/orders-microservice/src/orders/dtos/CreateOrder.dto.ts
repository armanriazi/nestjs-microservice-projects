
export enum  BookStateType{
  RENTED,
  QUEUE,
  READY
}

export class CreateOrderDto {
  bookname: string;
  user_id: string;
  bookstateType: BookStateType;
}


