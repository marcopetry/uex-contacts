import {
  ContactsRepository,
  Contact,
} from "../repositories/contacts-repository";

import { useEffect, useState } from "react";
import { CookiesKeys, useCookie } from "./use-cookies";

export function useContact({ id }: { id: string }) {
  const { cookieValue } = useCookie(CookiesKeys.Auth);

  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const getContacts = async () => {
      const contactsReposiroty = new ContactsRepository();
      if (cookieValue?.email) {
        const contactResponse = await contactsReposiroty.getContactById(
          Number(id)
        );

        setContact(contactResponse);
      }
    };

    getContacts();
  }, [cookieValue?.email, id]);

  return {
    contact,
  };
}
