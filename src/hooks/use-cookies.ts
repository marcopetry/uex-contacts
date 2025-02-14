import Cookies from "js-cookie";

interface UseCookieReturn {
  cookieValue: string | undefined;
  setCookie: (value: string, options?: Cookies.CookieAttributes) => void;
  removeCookie: () => void;
}

export enum CookiesKeys {
  Auth = "auth",
}

export const useCookie = (cookieName: CookiesKeys): UseCookieReturn => {
  const getCookie = (): string | undefined => {
    return Cookies.get(cookieName);
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
