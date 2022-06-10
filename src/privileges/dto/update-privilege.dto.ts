import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePrivilegeDto } from './create-privilege.dto';

export class UpdatePrivilegeDto extends CreatePrivilegeDto {
  @ApiProperty({ example: '91628538-1cbd-4db7-835b-823747c5237d', description: 'privilege id in uuid v4 format' })
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  readonly id: string;
}
