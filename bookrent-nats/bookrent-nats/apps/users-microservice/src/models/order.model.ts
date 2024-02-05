import { AggregateRoot } from '@nestjs/cqrs';

export class OrderModel extends AggregateRoot {
  public updatedAt: Date;
  public createdAt: Date;

  constructor(
    private readonly id: string,
    _createdAt: Date,
    _updatedAt: Date,
  ) {
    super();
    this.createdAt = _createdAt;
    this.updatedAt = _updatedAt;
  }

}
