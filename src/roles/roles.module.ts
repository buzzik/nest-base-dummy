import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from '../db/entities/role.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegesModule } from 'src/privileges/privileges.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity]), PrivilegesModule],
  exports: [RolesService],
})
export class RolesModule {}
