import {
  ContactsRepository,
  Contact,
} from "../repositories/contacts-repository";

import { useCallback, useEffect, useState } from "react";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useListContacts({ q }: { q: string }) {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(async () => {
    const contactsReposiroty = new ContactsRepository();
    if (cookieValue?.email) {
      const contactsResponse = await contactsReposiroty.getAllContactsByUser(
        cookieValue?.email
      );

      const contactsFiltered = contactsResponse.filter(
        (contact) => contact.name.includes(q) || contact.cpf.includes(q)
      );

      setContacts(contactsFiltered);
    }
  }, [cookieValue?.email, q]);

  useEffect(() => {
    getContacts();
  }, [cookieValue?.email, getContacts, q]);

  return {
    contacts,
    getContacts,
  };
}
