import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({ message: "O nome é obrigatório" }),
  email: z
    .string({ message: "E-mail é obrigatório" })
    .email("Endereço de e-mail inválido")
    .min(1, "O e-mail é obrigatório"),
  password: z.string({ message: "A senha é obrigatória" }),
});
