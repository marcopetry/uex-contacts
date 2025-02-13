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
  public createUser<User>(
    user: User,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.create(user, onSuccess, onError);
  }

  // Atualizar um usuário existente
  public updateUser<User>(
    user: User,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.put(user, onSuccess, onError);
  }

  // Buscar um usuário pelo ID
  public getUserById<User>(
    id: number,
    onSuccess: (user: User | null) => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.getById(id, onSuccess, onError);
  }

  // Buscar todos os usuários
  public getAllUsers<User>(
    onSuccess: (users: User[]) => void,
    onError: (error: unknown) => void,
    filter?: (users: User) => boolean
  ): void {
    this.dbService.getAll(onSuccess, onError, filter);
  }
}
