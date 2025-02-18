import { z } from "zod";

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica tamanho e se são todos iguais

  const calcDigit = (slice: string, factor: number) => {
    let sum = 0;
    for (const char of slice) {
      sum += parseInt(char) * factor--;
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const digit1 = calcDigit(cpf.slice(0, 9), 10);
  const digit2 = calcDigit(cpf.slice(0, 10), 11);

  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
};

// Criando um schema Zod para CPF
const cpfSchema = z
  .string({ message: "Campo obrigatório" })
  .min(11)
  .max(14)
  .regex(/^\d{11}$|^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato inválido")
  .refine(validateCPF, { message: "CPF inválido" });

const contactSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: cpfSchema,
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
