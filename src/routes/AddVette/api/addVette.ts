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
      // Add new Vette detail to cache so an extra detail call doesn't need to be made
      queryClient.setQueryData(["vette", data.id], data);

      // Invalidate previous queries
      queryClient.invalidateQueries(["vettes"]);
    },
    mutationFn: createVette,
  });
};
