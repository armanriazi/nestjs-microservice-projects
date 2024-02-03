export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}
export class CreateOrdersCommand {
  // public readonly updatedAt?: string;
  // public readonly createAt?: string;
  constructor(
    public readonly userId: string,
    public readonly bookname: string,
    public readonly bookstateType: BookStateType,
  ) {}
}
export class DeleteOrdersCommand {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

// ./task/cqrs/commands/update-by-completed.command
export class UpdateOrdersCommand {
  bookname: string;
  bookstateType: BookStateType;
  constructor(bookname: string, bookstateType: BookStateType) {
    this.bookname = bookname;
    this.bookstateType =
      bookstateType === BookStateType.QUEUE
        ? BookStateType.QUEUE
        : BookStateType.RENTED;
  }
}
