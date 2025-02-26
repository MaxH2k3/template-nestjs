import { INestApplication } from '@nestjs/common';
import { SetupScalar } from './scalar.config';
import { Logger } from 'nestjs-pino';

export function ConfigModule(app: INestApplication) {
  SetupScalar(app);
  const logger = app.get(Logger);
  logger.log('ConfigModule setup complete');
}
