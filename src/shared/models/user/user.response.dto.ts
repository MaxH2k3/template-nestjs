import { AutoMap } from '@automapper/classes';

export class UserResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  firstName: string;

  dob?: Date;
  dod?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  @AutoMap()
  avatar?: string;

  @AutoMap()
  images: string[];

  @AutoMap()
  gender?: string;

  @AutoMap()
  bio?: string;

  @AutoMap()
  job?: string;
}
