import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../shared/models/user/user.response.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserResponseDto,
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => new Date(Number(src.createdAt))),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) =>
            src.createdAt ? new Date(Number(src.createdAt)) : null,
          ),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom((src) =>
            src.updatedAt ? new Date(Number(src.updatedAt)) : null,
          ),
        ),
        forMember(
          (dest) => dest.dob,
          mapFrom((src) => (src.dob ? new Date(Number(src.dob)) : null)),
        ),
        forMember(
          (dest) => dest.dod,
          mapFrom((src) => (src.dod ? new Date(Number(src.dod)) : null)),
        ),
      );
    };
  }
}
