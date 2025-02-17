import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseGeoLocationApiParams = {
  cep: string;
};

type UseGeoLocationApiResponse = {
  place_id: number;
  licence: string;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string];
};

export const useGeoLocationApi = ({ cep }: UseGeoLocationApiParams) => {
  const queryFn = async () => {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          format: "json",
          q: cep,
        },
      }
    );
    return data;
  };
  return useQuery<UseGeoLocationApiResponse[]>({
    queryFn,
    queryKey: ["openstreetmap", cep],
    enabled: cep?.length === 8,
  });
};
