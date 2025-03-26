import { axios } from "@/src/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { VetteObject } from "@/src/types";

export const getAllVettes = (): Promise<VetteObject[]> => {
  return axios.get("/vettes");
};

export function getAllVettesQueryOptions() {
  return queryOptions({
    queryKey: ["vettes"],
    queryFn: () => getAllVettes(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export const useAllVettes = () => useQuery(getAllVettesQueryOptions());
