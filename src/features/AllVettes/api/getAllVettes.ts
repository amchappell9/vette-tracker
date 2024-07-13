import { axios } from "@/src/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { VetteObject } from "@/src/types";

export type VettesResponse = {
  vettes: VetteObject[];
};

export const getAllVettes = (): Promise<VettesResponse> => {
  return axios.get("/vettes");
};

export function getAllVettesQueryOptions() {
  return queryOptions({
    queryKey: ["vettes"],
    queryFn: () => getAllVettes(),
    staleTime: 5 * 60 * 1000,
  });
}

export const useAllVettes = () => {
  return useQuery(getAllVettesQueryOptions());
};
