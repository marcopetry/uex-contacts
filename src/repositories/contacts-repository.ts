import { IndexedDBService, Stores } from "./indexed-db";

export interface Contact {
  id?: number;
  name: string;
  cpf: string;
  address: string;
  neighboor: string;
  complement?: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  ownerEmail: string;
}

export class ContactsRepository {
  private dbService: IndexedDBService;
  private dbReady: Promise<void>;

  constructor() {
    this.dbService = new IndexedDBService(Stores.Contacts);
    this.dbReady = this.dbService.dbReady; // Aguarda o banco abrir
  }

  private async ensureDBReady(): Promise<void> {
    await this.dbReady;
  }

  public async createContact(contact: Contact): Promise<IDBValidKey> {
    await this.ensureDBReady();
    return this.dbService.create(contact);
  }

  public async updateContact(contact: Contact): Promise<void> {
    await this.ensureDBReady();
    return this.dbService.put(contact);
  }

  public async getContactById(id: number): Promise<Contact | null> {
    await this.ensureDBReady();
    return this.dbService.getById(id);
  }

  public async deleteContact(id: number): Promise<void> {
    await this.ensureDBReady();
    return this.dbService.delete(id);
  }

  public async getAllContacts(
    filter?: (contact: Contact) => boolean
  ): Promise<Contact[]> {
    await this.ensureDBReady();
    return this.dbService.getAll(filter);
  }

  public async getAllContactsByUser(ownerEmail: string): Promise<Contact[]> {
    await this.ensureDBReady();
    return this.dbService.getAll((user) => user.ownerEmail === ownerEmail);
  }
}
