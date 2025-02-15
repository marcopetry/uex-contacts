import Cookies from "js-cookie";
import { User } from "../repositories/users-repository";

interface UseCookieReturn {
  cookieValue: User | undefined;
  setCookie: (value: string, options?: Cookies.CookieAttributes) => void;
  removeCookie: () => void;
}

export enum CookiesKeys {
  Auth = "auth",
}

export const useCookie = (cookieName: CookiesKeys): UseCookieReturn => {
  const getCookie = (): User | undefined => {
    const cookie = Cookies.get(cookieName);
    return cookie ? JSON.parse(cookie) : cookie;
  };

  const setCookie = (
    value: string,
    options: Cookies.CookieAttributes = {}
  ): void => {
    Cookies.set(cookieName, value, { expires: 7, ...options });
  };

  const removeCookie = (): void => {
    Cookies.remove(cookieName);
  };

  return {
    cookieValue: getCookie(),
    setCookie,
    removeCookie,
  };
};
