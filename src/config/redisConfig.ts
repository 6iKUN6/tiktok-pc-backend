//cache
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export default async function (configService: ConfigService) {
  const client = createClient({
    socket: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
    password: configService.get('REDIS_PASSWORD'),
    database: configService.get('REDIS_DB'),
  });
  await client.connect();
  return client;
}
