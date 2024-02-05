export class GetUsersQuery {}
export class GetUserByIdQuery {
  constructor(public readonly userId: string) {}
}
export class GetUserByUserName {
  constructor(public readonly username: string) {}
}
