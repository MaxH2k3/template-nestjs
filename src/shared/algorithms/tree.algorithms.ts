import { Relationship, User } from '@prisma/client';

class FamilyTreeNode {
  id: string;
  user: User;
  childrens: FamilyTreeNode[];
}

class FamilyTree<T> {
  private nodes: Map<string, FamilyTreeNode>;
  private roots: FamilyTreeNode[];

  constructor(users: User[], relationships: Relationship[]) {
    this.nodes = new Map();
    this.roots = [];
    this.initTree(users, relationships);
  }

  // Init FamilyTree
  initTree(users: any[], relationships: any[]) {
    // Create FamilyTreeNode for each people and save to HashMap
    users.forEach((user) => {
      this.nodes.set(user.id, user);
    });
    // Make tree from Relationship
    relationships.forEach((relation) => {
      const parent = this.nodes.get(relation.userId1);
      const spouse = this.nodes.get(relation.userId2);

      if (relation.childrenIds) {
        relation.childrenIds.forEach((childId) => {
          const child = this.nodes.get(childId);
          if (child && parent) {
            parent.childrens.push(child);
          }
          if (child && spouse) {
            spouse.childrens.push(childId);
          }
        });
      }
    });
    // Find people who are root tree (not include parent node)
    this.roots = [...this.nodes.values()].filter(
      (user) =>
        !relationships.some((rel) => rel.childrenIds?.includes(user.id)),
    );
  }

  // Quick search using HashMap
  findPersonById(id: string): FamilyTreeNode | undefined {
    return this.nodes.get(id);
  }

  // Iterator from root tree
  getFamily(node: FamilyTreeNode, level: number = 0): void {
    console.log(
      ' '.repeat(level * 2) + `-${node.user.firstName} ${node.user.lastName}`,
    );
    node.childrens.forEach((child) => this.getFamily(child, level++));
  }

  // Get all
  getAll(): void {
    this.roots.forEach((root) => this.getFamily(root));
  }
}
