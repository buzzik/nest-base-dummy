import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './db/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { RoleEntity } from './db/entities/role.entity';
import { PrivilegesModule } from './privileges/privileges.module';
import { PrivilegeEntity } from './db/entities/privilege.entity';
import { BannedUserEntity } from './db/entities/banned-user.entity';
import configuration from './config/configuration';
import ormConfig from './db/orm-config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      // envFilePath: `.${process.env.NODE_ENV}.env`,
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    RolesModule,
    PrivilegesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
