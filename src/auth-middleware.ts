import { CookiesKeys } from "./hooks/use-cookies";

export const authMiddleware = async (notTriggerError?: boolean) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(CookiesKeys.Auth));

  if (!cookie && !notTriggerError) {
    window.location.href = "/login";
    throw new Error("Unauthorized"); // Se não houver cookie, redireciona
  }

  return {
    cookie,
  }; // Retorna dados de autenticação ou qualquer outro valor necessário
};
