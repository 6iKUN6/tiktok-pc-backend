import { ConfigService } from '@nestjs/config';
// configService.get('JWT_EXP')
export default async function (configService: ConfigService) {
  return {
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: parseInt(configService.get('JWT_EXP')),
    },
  };
}
