import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { hash } from 'bcrypt';
import { BannedUserEntity } from './banned-user.entity';
// interface UserCreationAttrs {
//   email: string;
//   password: string;
// }

@Entity('users')
export class UserEntity {
  @ApiProperty({ example: '06f9ed5a-8383-4204-a330-0224d481e2b2', description: 'Unique identifier' })
  @Column({ type: 'uuid', unique: true, nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@domain.com', description: 'Unique e-mail' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'Password12345', description: 'User`s password' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinTable()
  role: RoleEntity;

  @OneToOne(() => BannedUserEntity, (bannedUser) => bannedUser.user, {
    eager: true,
  })
  banned: BannedUserEntity;
}
