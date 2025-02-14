import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z
    .string({ message: "Campo obrigatório" })
    .regex(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos"),
  address: z
    .string({ message: "Campo obrigatório" })
    .min(5, "Endereço deve ter pelo menos 5 caracteres"),
  neighboor: z
    .string({ message: "Campo obrigatório" })
    .min(3, "Bairro deve ter pelo menos 3 caracteres"),
  complement: z.string().optional(),
  zipCode: z
    .string({ message: "Campo obrigatório" })
    .regex(/^\d{8}$/, "CEP deve ter 8 dígitos numéricos"),
  city: z
    .string({ message: "Campo obrigatório" })
    .min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z
    .string({ message: "Campo obrigatório" })
    .min(2, "Estado deve ter pelo menos 2 caracteres"),
  country: z
    .string({ message: "Campo obrigatório" })
    .min(2, "País deve ter pelo menos 2 caracteres"),
  latitude: z
    .number({ message: "Campo obrigatório" })
    .min(-90, "Latitude deve ser no mínimo -90")
    .max(90, "Latitude deve ser no máximo 90"),
  longitude: z
    .number({ message: "Campo obrigatório" })
    .min(-180, "Longitude deve ser no mínimo -180")
    .max(180, "Longitude deve ser no máximo 180"),
  phone: z
    .string({ message: "Campo obrigatório" })
    .regex(/^\d{11}$/, "Telefone deve ter 11 dígitos numéricos"),
});

export type Contact = z.infer<typeof contactSchema>;
export { contactSchema };
