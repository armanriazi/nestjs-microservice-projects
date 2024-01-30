
// import {
//   IsString,
//   IsNotEmpty,
//   IsEnum,
// } from 'class-validator';

export enum  BookStateType{
  RENTED,
  QUEUE,
  READY
}

export class CreateOrderDto {
  // @IsString()
  // @IsNotEmpty()
  bookname: string;

  // @IsString()
  // @IsNotEmpty()
  user_id: string;

  //@IsEnum(BookStateType)
  bookstateType: BookStateType;
}


