import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role name' })
  @IsNotEmpty()
  @Length(3, 32)
  readonly name: string;

  @ApiProperty({ example: 'Admin role', description: 'Role description' })
  @IsNotEmpty()
  @Length(3, 128)
  readonly description: string;
}
