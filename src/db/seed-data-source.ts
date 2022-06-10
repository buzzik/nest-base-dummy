import { DataSource } from 'typeorm';
import ormConfig from './orm-config';
const OrmDataSource = new DataSource({
  ...ormConfig,
  migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
});

export default OrmDataSource;
