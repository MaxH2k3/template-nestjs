import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { Mapper } from '@automapper/core';
import { User } from '../../../domain/entities/user.entity';
import { UserResponseDto } from '../../../shared/models/user/user.response.dto';
import { InjectMapper } from '@automapper/nestjs';
import { UserFilterDto } from '../../../shared/models/user/user.filter.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getUsers(filter: UserFilterDto) {
    let users: User[] = [];
    if (filter.isFilter()) {
      users = await this.userRepository.filter(filter);
    } else {
      users = await this.userRepository.findAll();
    }

    return this.mapper.mapArray(users, User, UserResponseDto);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findById(id);
    return this.mapper.map(user, User, UserResponseDto);
  }
}
