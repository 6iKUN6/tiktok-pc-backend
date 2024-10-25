import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');
  await app.listen(8899);
}
bootstrap();
//修改后访问地址为 localhost:8899/api/xxx