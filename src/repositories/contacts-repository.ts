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

  constructor() {
    this.dbService = new IndexedDBService(Stores.Contacts);
  }

  public async createContact(contact: Contact): Promise<IDBValidKey> {
    return this.dbService.create(contact);
  }

  public async updateContact(contact: Contact): Promise<void> {
    return this.dbService.put(contact);
  }

  public async getContactById(id: number): Promise<Contact | null> {
    return this.dbService.getById(id);
  }

  public async deleteContact(id: number): Promise<void> {
    return this.dbService.delete(id);
  }

  public async getAllContacts(
    filter?: (contact: Contact) => boolean
  ): Promise<Contact[]> {
    return this.dbService.getAll(filter);
  }

  public async getAllContactsByUser(ownerEmail: string): Promise<Contact[]> {
    return this.dbService.getAll((user) => user.ownerEmail === ownerEmail);
  }

  public async deleteAllContactsByUser(ownerEmail: string): Promise<void> {
    const contacts = await this.dbService.getAll(
      (user: Contact) => user.ownerEmail === ownerEmail
    );
    contacts.forEach(async (contact) => {
      await this.dbService.delete(contact.id!);
    });
  }
}
