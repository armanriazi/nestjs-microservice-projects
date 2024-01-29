import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
