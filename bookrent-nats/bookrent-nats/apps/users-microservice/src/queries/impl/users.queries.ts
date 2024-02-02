export class GetUsersQuery {}
export class GetUserByIdQuery {
  constructor(public readonly userId: string) {}
}
