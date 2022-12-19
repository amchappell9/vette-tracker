import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import { VetteObject } from "../../../types/types";

/**
 * The object that will be return from the server upon successful deletion
 */
type SuccessfulResponseObject = {
  msg: string;
};

export const deleteVette = (
  vetteInfo: VetteObject
): Promise<SuccessfulResponseObject> => {
  return axios.delete("/vettes", {
    data: vetteInfo,
  });
};

export const useDeleteVette = () => {
  return useMutation({
    onSuccess: (data, vetteInfo, context) => {
      // Remove vette from all vettes cache
      const previousVettes = queryClient.getQueryData<{
        vettes: Array<VetteObject>;
      }>(["vettes"]);
      const updatedVettes = previousVettes?.vettes.filter(
        (vette) => vette.id !== vetteInfo.id
      );

      // Something is blowing up here, not sure what

      queryClient.setQueryData(["vettes"], updatedVettes);
      queryClient.invalidateQueries(["vette", vetteInfo.id]);
    },
    mutationFn: deleteVette,
  });
};
