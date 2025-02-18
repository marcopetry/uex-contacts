export const INDEXED_DB_NAME = "uex_store";
const INDEX_DB_VERSION = 4;

export enum Stores {
  Users = "users",
  Contacts = "contacts",
}

export class IndexedDBService {
  private static dbInstance: IDBDatabase | null = null;
  private static dbReadyPromise: Promise<IDBDatabase> | null = null;
  private storeName: string;

  constructor(storeName: Stores) {
    this.storeName = storeName;
  }

  // Método para abrir a conexão apenas uma vez
  private static openDatabase(): Promise<IDBDatabase> {
    if (this.dbInstance) {
      return Promise.resolve(this.dbInstance);
    }

    if (!this.dbReadyPromise) {
      this.dbReadyPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(INDEXED_DB_NAME, INDEX_DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBRequest).result;

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
          this.dbInstance = (event.target as IDBRequest).result;
          console.log("IndexedDB aberto com sucesso!");
          resolve(this.dbInstance!);
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

    return this.dbReadyPromise;
  }

  private async getStore(): Promise<IDBObjectStore> {
    const db = await IndexedDBService.openDatabase();
    return db
      .transaction(this.storeName, "readwrite")
      .objectStore(this.storeName);
  }

  public async create<T>(item: T): Promise<IDBValidKey> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.add(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public async put<T>(item: T): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public async getById<T>(id: number): Promise<T | null> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

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

  public async delete(id: number): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }

  public async clear(): Promise<void> {
    const store = await this.getStore();
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  }
}
