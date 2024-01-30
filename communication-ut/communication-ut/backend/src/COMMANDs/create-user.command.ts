export class CreateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly bookname: string,
  ) {}
}
