import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePrivilegeDto {
  @ApiProperty({ example: 'CREATE_ARTICLE', description: 'privilege name' })
  @IsNotEmpty()
  @Length(3, 32)
  readonly name: string;
}
