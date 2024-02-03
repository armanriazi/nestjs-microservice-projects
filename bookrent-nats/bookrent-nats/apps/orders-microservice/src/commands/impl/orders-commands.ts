export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}
export class CreateOrdersCommand {
  constructor(
    public readonly bookname: string,
    public readonly bookstateType: BookStateType,
    public readonly userId: string,
  ) {}
}
