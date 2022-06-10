import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@domain.com', description: 'Unique e-mail' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(6, 32)
  @ApiProperty({ example: 'Password12345', description: 'User`s password' })
  readonly password: string;
}
