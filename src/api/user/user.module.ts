import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserGuard } from 'src/api/auth/user/user.guard';
import { CacheModule } from 'src/common/redis/redis.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), CacheModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: UserGuard, //全局路由守卫
    },
  ],
})
export class UserModule {}
