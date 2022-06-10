import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrivilegeEntity } from './privilege.entity';
import { UserEntity } from './user.entity';

// interface RoleCreationAttrs {
//   email: string;
//   password: string;
// }

@Entity('roles')
export class RoleEntity {
  @ApiProperty({ example: '06f9ed5a-8383-4204-a330-0224d481e2b2', description: 'Unique identifier' })
  @Column({ type: 'uuid', unique: true, nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'admin', description: 'Unique role title' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @ApiProperty({ example: 'Regular user', description: 'User`s role description' })
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.id)
  users: UserEntity[];

  @ManyToMany(() => PrivilegeEntity)
  @JoinTable()
  privileges: PrivilegeEntity[];
}
