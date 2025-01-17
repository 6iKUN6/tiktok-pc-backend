import { Module } from '@nestjs/common';
import { CacheService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import loadRedisConfig from '../../config/redisConfig';

@Module({
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: loadRedisConfig,
      inject: [ConfigService],
    },
  ],
})
export class CacheModule {}
