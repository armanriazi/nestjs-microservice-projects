import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  bookname: string;

  @IsEnum(BookStateType)
  bookstateType: BookStateType;

  @IsNotEmpty()
  userId: string;

  
}
