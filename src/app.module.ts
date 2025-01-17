import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import loadMysqlConfig from './config/dbConfig';

const NODE_ENV = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
console.log(`env:${NODE_ENV}`, process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`env/.env.${NODE_ENV}`],
    }),
    SequelizeModule.forRootAsync({ useFactory: loadMysqlConfig, inject: [ConfigService] }),
    UserModule,
  ],
})
export class AppModule {}
