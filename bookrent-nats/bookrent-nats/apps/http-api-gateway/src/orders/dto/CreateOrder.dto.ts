import { IsDate, IsDateString, IsEmpty, IsEnum, IsISO8601, IsNotEmpty, IsString, Length } from 'class-validator';

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

  @IsEmpty()
  id: string;
  
  // @IsISO8601({ strict: true })
  // @Length(10, 10)
  //@IsDateAndTime()
  createdAt?: string;

  
  updatedAt?: string;

}
