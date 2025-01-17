import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

function loadMysqlConfig(configService: ConfigService): SequelizeModuleOptions {
  return {
    dialect: 'mysql' as Dialect,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    autoLoadModels: true,
    synchronize: true,
  };
}

export default loadMysqlConfig;
