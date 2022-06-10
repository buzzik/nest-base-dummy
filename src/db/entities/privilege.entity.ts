import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface PermissionCreationAttrs {
  title: string;
  description: string;
}

@Entity('privileges')
export class PrivilegeEntity {
  @ApiProperty({ example: '06f9ed5a-8383-4204-a330-0224d481e2b2', description: 'Unique identifier' })
  @Column({ type: 'uuid', unique: true, nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin', description: 'Unique permission title' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;
}
