// import axios from "axios";
import { axios } from "../../../lib/axios";
import { useQuery } from "react-query";
import { VetteObject } from "../../../types/types";

type VettesResponse = {
  vettes: VetteObject[];
};

export const getAllVettes = (): Promise<VettesResponse> => {
  return axios.get("/vettes");
};

export const useAllVettes = () => {
  return useQuery({
    queryKey: ["allVettes"],
    queryFn: () => getAllVettes(),
  });
};
