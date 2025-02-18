import { IndexedDBService, Stores } from "./indexed-db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  private dbService: IndexedDBService;
  private dbReady: Promise<void>;

  constructor() {
    this.dbService = new IndexedDBService(Stores.Users);
    this.dbReady = this.dbService.dbReady; // Aguarda o banco abrir
  }

  private async ensureDBReady(): Promise<void> {
    await this.dbReady;
  }

  // Adicionar um novo usuário

  public async createUser(contact: User): Promise<IDBValidKey> {
    await this.ensureDBReady();
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
    await this.ensureDBReady();
    return this.dbService.getAll(filter);
  }

  public async getUserByEmail(email: string): Promise<User[]> {
    await this.ensureDBReady();
    return this.dbService.getAll((user) => user.email === email);
  }
}
