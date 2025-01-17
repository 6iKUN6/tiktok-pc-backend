import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '../env/.env.dev' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '../env/.env.prod' });
} else {
  dotenv.config({ path: '../env/.env.dev' }); // 加载默认的.env文件
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('ikun') // 标题
    .setDescription('接口文档') // 描述
    .setVersion('1.0') // 版本
    .build();

  const document = SwaggerModule.createDocument(app, options);
  //配置swgger地址
  SwaggerModule.setup('/api-doc', app, document);

  app.setGlobalPrefix('api/');
  await app.listen(8899);
}
bootstrap();
//修改后访问地址为 localhost:8899/api/xxx
