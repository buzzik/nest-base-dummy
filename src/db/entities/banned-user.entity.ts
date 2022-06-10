import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
// interface UserCreationAttrs {
//   email: string;
//   password: string;
// }

@Entity('banned-users')
export class BannedUserEntity {
  @Column({ type: 'integer', unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  userId: string;

  // @Column({ unique: true, nullable: false })
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
