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

  // Adicionar um novo contato
  public createContact(
    contact: Contact,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.create(contact, onSuccess, onError);
  }

  // Atualizar um contato existente
  public updateContact<Contact>(
    contact: Contact,
    onSuccess: () => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.put(contact, onSuccess, onError);
  }

  // Buscar um contato pelo ID
  public getContactById<Contact>(
    id: number,
    onSuccess: (contact: Contact | null) => void,
    onError: (error: unknown) => void
  ): void {
    this.dbService.getById(id, onSuccess, onError);
  }

  // Buscar todos os contatos
  public getAllContacts(
    onSuccess: (contacts: Contact[]) => void,
    onError: (error: unknown) => void,
    filter?: (contact: Contact) => boolean
  ): void {
    this.dbService.getAll(onSuccess, onError, filter);
  }
}
