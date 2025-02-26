import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './infrastructure/configurations/config.module';
import { Logger } from 'nestjs-pino';
import { Headers } from './domain/constants/common.constant';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: ['http://localhost:3000'], // Allowed origins
    methods: 'GET,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: '*', // Allowed headers
    credentials: true, // Allow cookies
    exposedHeaders: [Headers.HeaderPagination], // Expose headers
  });

  ConfigModule(app);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}

bootstrap();
