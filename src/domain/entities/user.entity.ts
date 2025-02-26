import { Relationship } from './relationship.entity';
import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  id: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  firstName: string;

  dob?: bigint;
  dod?: bigint;
  createdAt?: bigint;
  updatedAt?: bigint;

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

  // Relationships
  relationships1?: Relationship[];
  relationships2?: Relationship[];
}
