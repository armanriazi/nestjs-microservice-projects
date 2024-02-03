export class OrderCreateEvent {
  constructor(
    public readonly userId: string,
    public readonly Id: string,
  ) {}
}
