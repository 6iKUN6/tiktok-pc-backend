import { Module } from '@nestjs/common';
import { CacheService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import loadRedisConfig from '../../config/redisConfig';

// @Global()
@Module({
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: loadRedisConfig,
      inject: [ConfigService],
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
