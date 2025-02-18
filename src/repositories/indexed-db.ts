export const INDEXED_DB_NAME = "uex_store";
const INDEX_DB_VERSION = 4;

export enum Stores {
  Users = "users",
  Contacts = "contacts",
}

export class IndexedDBService {
  private storeName: string;
  private db: IDBDatabase | null = null;
  public dbReady: Promise<void>;

  constructor(storeName: Stores) {
    this.storeName = storeName;
    this.dbReady = this.openDatabase(); // Garante que o banco seja aberto antes do uso
  }

  private openDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(INDEXED_DB_NAME, INDEX_DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db: IDBDatabase = (event.target as IDBRequest).result;

        Object.values(Stores).forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        });

        const userStore = (
          event.currentTarget as IDBRequest
        ).transaction!.objectStore(Stores.Users);
        const contactsStore = (
          event.currentTarget as IDBRequest
        ).transaction!.objectStore(Stores.Contacts);

        userStore.createIndex("emailIndex", "email", { unique: true });
        contactsStore.createIndex("cpfIndex", "cpf", { unique: true });
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBRequest).result;
        console.log("IndexedDB aberto com sucesso!");
        resolve();
      };

      request.onerror = (event: Event) => {
        console.error(
          "Erro ao abrir IndexedDB:",
          (event.target as IDBRequest).error
        );
        reject((event.target as IDBRequest).error);
      };
    });
  }

  private async getStore(): Promise<IDBObjectStore> {
    await this.dbReady; // Espera até que o banco esteja pronto
    if (!this.db) throw new Error("Banco de dados não inicializado.");
    return this.db
      .transaction(this.storeName, "readwrite")
      .objectStore(this.storeName);
  }

  // Método para adicionar um item
  public async create<T>(item: T): Promise<IDBValidKey> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.add(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para atualizar (ou inserir) um item
  public async put<T>(item: T): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para obter um item por ID
  public async getById<T>(id: number): Promise<T | null> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para buscar todos os itens com filtro de query (callback)
  public async getAll<T>(query?: (item: T) => boolean): Promise<T[]> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const result = query ? request.result.filter(query) : request.result;
        resolve(result as T[]);
      };
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para deletar um item por ID
  public async delete(id: number): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  // Método para limpar todos os dados da store
  public async clear(): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }
}
