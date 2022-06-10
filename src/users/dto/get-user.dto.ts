import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'Unique e-mail' })
  readonly email: string;
}
