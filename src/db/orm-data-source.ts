import { DataSource } from 'typeorm';
import ormConfig from './orm-config';

const OrmDataSource = new DataSource(ormConfig);

export default OrmDataSource;
