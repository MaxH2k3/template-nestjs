import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/infrastructure/persistances/database.service';
import { User } from 'src/domain/entities/user.entity';
import { UserFilterDto } from '../../shared/models/user/user.filter.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(user: User) {
    this.databaseService.user.create({
      data: user as Prisma.UserCreateInput,
    });
  }

  async filter(filterDto: UserFilterDto): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (filterDto.search) {
      where.OR = [
        { firstName: { contains: filterDto.search, mode: 'insensitive' } },
        { lastName: { contains: filterDto.search, mode: 'insensitive' } },
        { bio: { contains: filterDto.search, mode: 'insensitive' } },
      ];
    }

    if (filterDto.gender !== undefined) {
      where.gender = filterDto.gender;
    }

    if (filterDto.dob) {
      where.dob = { gte: filterDto.dob }; // Lọc từ ngày sinh trở đi
    }

    if (filterDto.dod !== undefined) {
      where.dod = filterDto.dod ? { not: null } : null; // Nếu `dod` = true, tìm user có ngày mất
    }

    if (filterDto.job) {
      where.job = { contains: filterDto.job, mode: 'insensitive' };
    }

    const users = this.databaseService.user.findMany({ where });

    return users as unknown as User[];
  }

  async findAll(): Promise<User[]> {
    return this.databaseService.user.findMany() as unknown as User[];
  }

  async findById(id: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    }) as unknown as User;
  }

  async update(id: string, user: User) {
    this.databaseService.user.update({
      where: {
        id,
      },
      data: user as Prisma.UserUpdateInput,
    });
  }

  async delete(id: string) {
    this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
