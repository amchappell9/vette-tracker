import { axios } from "@/src/lib/axios";
import { VetteObject, VetteValues } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllVettesQueryOptions } from "../../AllVettes/api/getAllVettes";

type CreateOrUpdateVetteDTO = {
  vette: VetteValues;
  id?: number;
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVette,
    onSuccess: (data) => {
      // Add new Vette detail to cache so an extra detail call doesn't need to be made
      queryClient.setQueryData(["vette", data.id.toString()], data);

      // Invalidate previous queries
      queryClient.invalidateQueries({ queryKey: ["vettes"] });

      // Refetch query
      queryClient.prefetchQuery(getAllVettesQueryOptions());
    },
  });
};
