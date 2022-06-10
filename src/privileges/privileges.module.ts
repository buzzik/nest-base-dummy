import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivilegeEntity } from 'src/db/entities/privilege.entity';
import { PrivilegesController } from './privileges.controller';
import { PrivilegesService } from './privileges.service';

@Module({
  controllers: [PrivilegesController],
  providers: [PrivilegesService],
  imports: [TypeOrmModule.forFeature([PrivilegeEntity])],
  exports: [PrivilegesService],
})
export class PrivilegesModule {}
