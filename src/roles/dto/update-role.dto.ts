import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Role name' })
  @IsNotEmpty()
  @Length(3, 32)
  readonly name: string;

  @ApiProperty({ example: 'privileges array', description: 'List fo privileges' })
  @IsNotEmpty()
  readonly privileges: string[];
}
