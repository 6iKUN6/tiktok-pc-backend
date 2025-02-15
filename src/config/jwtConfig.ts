import { ConfigService } from '@nestjs/config';

export default async function (configService: ConfigService) {
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP'),
    },
  };
}
