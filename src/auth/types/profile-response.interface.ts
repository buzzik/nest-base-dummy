import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseInterface {
  @ApiProperty({ example: '605cc418-5292-4066-a24e-8d434828e355', description: 'User UUID' })
  id: string;
  @ApiProperty({ example: 'user@mail.com', description: 'Users email' })
  email: string;
  @ApiProperty({ example: 'User', description: 'Users role' })
  role: string;
  @ApiProperty({ example: '[ "POST_CREATE","POST_UPDATE", "POST_DELETE"]', description: 'Users privileges' })
  privileges: string[];
}
