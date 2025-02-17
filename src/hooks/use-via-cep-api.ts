import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseViaCepApiParams = {
  cep: string;
};

type UseViaCepApiResponse = {
  cep: string;
  logradouro: string;
  complemento?: string;
  unidade?: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export const useViaCepApi = ({ cep }: UseViaCepApiParams) => {
  const queryFn = async () => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  };
  return useQuery<UseViaCepApiResponse>({
    queryFn,
    queryKey: ["via-cep", cep],
    enabled: cep?.length === 8,
  });
};
