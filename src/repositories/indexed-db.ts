export const INDEXED_DB_NAME = "uex_store";

export enum Stores {
  Users = "users",
}

export class IndexedDBService {
  private storeName: string;
  private db: IDBDatabase | null = null;

  constructor(storeName: Stores) {
    this.storeName = storeName;
    this.openDatabase();
  }

  private openDatabase(): void {
    const request = indexedDB.open(INDEXED_DB_NAME);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error("Database error: ", (event.target as IDBRequest).error);
    };
  }

  private getStore(): IDBObjectStore | null {
    if (this.db) {
      return this.db
        .transaction(this.storeName, "readwrite")
        .objectStore(this.storeName);
    }
    return null;
  }

  // Método para adicionar um item
  public create<T>(
    item: T,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    const store = this.getStore();
    if (store) {
      const request = store.add(item);
      request.onsuccess = () => {
        onSuccess();
      };
      request.onerror = (event) => {
        onError((event.target as IDBRequest).error);
      };
    } else {
      onError("Store not found or database not opened.");
    }
  }

  // Método para atualizar (ou inserir) um item
  public put<T>(
    item: T,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    const store = this.getStore();
    if (store) {
      const request = store.put(item);
      request.onsuccess = () => {
        onSuccess();
      };
      request.onerror = (event) => {
        onError((event.target as IDBRequest).error);
      };
    } else {
      onError("Store not found or database not opened.");
    }
  }

  // Método para obter um item por ID
  public getById<T>(
    id: number,
    onSuccess: (item: T) => void,
    onError: (error: unknown) => void
  ): void {
    const store = this.getStore();
    if (store) {
      const request = store.get(id);
      request.onsuccess = () => {
        onSuccess(request.result);
      };
      request.onerror = (event) => {
        onError((event.target as IDBRequest).error);
      };
    } else {
      onError("Store not found or database not opened.");
    }
  }

  // Método para buscar todos os itens com filtro de query (callback)
  public getAll<T>(
    onSuccess: (items: T[]) => void,
    onError: (error: unknown) => void,
    query?: (item: T) => boolean
  ): void {
    const store = this.getStore();
    if (store) {
      const request = store.getAll();
      request.onsuccess = () => {
        const result = query ? request.result.filter(query) : request.result;
        onSuccess(result as T[]);
      };
      request.onerror = (event) => {
        onError((event.target as IDBRequest).error);
      };
    } else {
      onError("Store not found or database not opened.");
    }
  }
}
