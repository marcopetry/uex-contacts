import { IndexedDBService, Stores } from "./indexed-db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  private dbService: IndexedDBService;

  constructor() {
    this.dbService = new IndexedDBService(Stores.Users);
  }

  // Adicionar um novo usuário
  public async createUser(contact: User): Promise<IDBValidKey> {
    return this.dbService.create(contact);
  }

  // Buscar um usuário pelo ID
  public deleteUser(id: number): Promise<void> {
    return this.dbService.delete(id);
  }

  // Buscar todos os usuários
  public async getAllUsers(
    filter?: (contact: User) => boolean
  ): Promise<User[]> {
    return this.dbService.getAll(filter);
  }

  public async getUserByEmail(email: string): Promise<User[]> {
    return this.dbService.getAll((user) => user.email === email);
  }
}
