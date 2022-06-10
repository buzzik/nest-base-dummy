import { Module } from '@nestjs/common';
import { RoleEntity } from 'src/db/entities/role.entity';
import { UsersController } from './users.controller';
import { UserEntity } from '../db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';
import { BannedUserEntity } from 'src/db/entities/banned-user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, BannedUserEntity]), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
