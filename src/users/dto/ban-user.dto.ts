import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: '605cc418-5292-4066-a24e-8d434828e355', description: 'User UUID' })
  @IsUUID(4, { each: true })
  userId!: string;
}
