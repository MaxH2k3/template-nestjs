import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/persistances/database.module';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../application/services/user-service/user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { AutomapperModule } from '@automapper/nestjs';
import { UserProfile } from '../../application/mappers/user.profile';

@Module({
  imports: [DatabaseModule, AutomapperModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProfile],
})
export class UserModule {}
