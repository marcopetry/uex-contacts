export const transformCPF = {
  transformInput: (input: string) => input?.replace(/\D/g, "").slice(0, 11),
  transformOutput: (input: string) =>
    input
      ?.replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
};

export const transformZipCode = {
  transformInput: (input: string) => input?.replace(/\D/g, "").slice(0, 8),
  transformOutput: (input: string) =>
    input?.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2"),
};

export const transformPhone = {
  transformInput: (input: string) => input?.replace(/\D/g, "").slice(0, 11),
  transformOutput: (input: string) =>
    input?.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
};
