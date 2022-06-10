import { UserEntity } from './entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import configuration from '../config/configuration';
import { RoleEntity } from './entities/role.entity';
import { PrivilegeEntity } from './entities/privilege.entity';
// import { TagEntity } from './tag/tag.entity';
// import { UserEntity } from './user/user.entity';
const config = configuration();
console.log(__dirname + '/**/*.entity{.ts,.js}');
console.log(__dirname + '/migrations/**/*{.ts,.js}');
const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.db.postgres.host,
  port: config.db.postgres.port,
  username: config.db.postgres.username,
  password: config.db.postgres.password,
  database: config.db.postgres.database,
  synchronize: false,
  logging: config.db.debug,
  entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  // entities: [UserEntity, RoleEntity, PermissionEntity],
  // migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
};
export default ormConfig;
