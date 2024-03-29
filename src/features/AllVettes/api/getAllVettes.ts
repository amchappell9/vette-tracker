import { axios } from "@/src/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { VetteObject } from "@/src/types";

export type VettesResponse = {
  vettes: VetteObject[];
};

export const getAllVettes = (): Promise<VettesResponse> => {
  return axios.get("/vettes");
};

export const useAllVettes = () => {
  return useQuery({
    queryKey: ["vettes"],
    queryFn: () => getAllVettes(),
    staleTime: 5 * 60 * 1000,
  });
};
