import {
  ContactsRepository,
  Contact,
} from "../repositories/contacts-repository";

import { useEffect, useState } from "react";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useListContacts() {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const contactsReposiroty = new ContactsRepository();
      if (cookieValue?.email) {
        const contactsResponse = await contactsReposiroty.getAllContactsByUser(
          cookieValue?.email
        );

        setContacts(contactsResponse);
      }
    };

    getContacts();
  }, [cookieValue?.email]);

  return {
    contacts,
  };
}
