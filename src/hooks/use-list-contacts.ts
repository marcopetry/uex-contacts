import {
  ContactsRepository,
  Contact,
} from "../repositories/contacts-repository";

import { useCallback, useEffect, useState } from "react";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useListContacts() {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = useCallback(async () => {
    const contactsReposiroty = new ContactsRepository();
    if (cookieValue?.email) {
      const contactsResponse = await contactsReposiroty.getAllContactsByUser(
        cookieValue?.email
      );

      setContacts(contactsResponse);
    }
  }, [cookieValue?.email]);

  useEffect(() => {
    getContacts();
  }, [cookieValue?.email, getContacts]);

  return {
    contacts,
    getContacts,
  };
}
