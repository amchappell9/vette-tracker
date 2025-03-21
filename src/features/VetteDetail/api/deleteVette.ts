import { axios } from "@/src/lib/axios";
import { VetteObject } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * The object that will be return from the server upon successful deletion
 */
type SuccessfulResponseObject = {
  msg: string;
};

export const deleteVette = (
  vetteInfo: VetteObject
): Promise<SuccessfulResponseObject> => {
  const url = `/vettes/${vetteInfo.id}`;

  return axios.delete(url, {
    data: vetteInfo,
  });
};

export const useDeleteVette = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (data, vetteInfo, context) => {
      // Remove vette from "all vettes" cache, without refetching
      const previousVettes = queryClient.getQueryData<VetteObject[]>([
        "vettes",
      ]);
      const updatedVettes = previousVettes?.filter(
        (vette) => vette.id !== vetteInfo.id
      );

      queryClient.setQueryData(["vettes"], updatedVettes);

      // Remove vette detail from cache
      queryClient.removeQueries({ queryKey: ["vette", vetteInfo.id] });
    },
    mutationFn: deleteVette,
  });
};
