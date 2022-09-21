import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { VetteObject, VetteValues } from "../../../types/types";

type CreateOrUpdateVetteDTO = {
  vette: VetteValues;
  id?: string;
};

export const createVette = (
  data: CreateOrUpdateVetteDTO
): Promise<VetteObject> => {
  // Check if an ID is present, if it is it's an update
  if (data.id) {
    return axios.put(`/vettes/${data.id}`, data.vette);
  }

  return axios.post("/vettes", data.vette);
};

export const useCreateOrUpdateVette = () => {
  return useMutation({
    onSuccess: (data) => {
      // Invalidate previous queries
      queryClient.invalidateQueries(["vettes"]);

      return queryClient.invalidateQueries(["vette", data.id]);
    },
    mutationFn: createVette,
  });
};
