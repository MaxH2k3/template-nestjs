import { Module } from '@nestjs/common';
import { UserController } from './api/controllers/user.controller';
import { UserService } from './application/services/user-service/user.service';
import { FilterModule } from './api/filters/filter.module';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './infrastructure/persistances/database.module';
import { UserModule } from './api/modules/user.module';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    FilterModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(), // Use classes for mapping
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'retrieve-data',
        ttl: 1000,
        limit: 20,
      },
      {
        name: 'authentication',
        ttl: 1000,
        limit: 3,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
