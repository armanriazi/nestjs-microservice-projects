export class OrderCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly Id: string,
  ) {}
}
