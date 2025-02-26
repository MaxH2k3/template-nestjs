import { User } from './user.entity';

export class Relationship {
  id: number;
  userId1?: string;
  userId2?: string;
  childrenIds: string[];
  status?: string;
  createdAt?: bigint;
  updatedAt?: bigint;
  rank?: number;

  // Relationships
  user1?: User;
  user2?: User;
}
